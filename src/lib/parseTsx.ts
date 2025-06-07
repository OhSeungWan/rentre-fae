import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

let idCounter = 0;
const genId = () => `node_${idCounter++}`;

const importPathMap: Record<string, string> = {
  Button: "@/components/ui/button",
  Card: "@/components/ui/card",
  CardHeader: "@/components/ui/card",
  CardContent: "@/components/ui/card",
  CardFooter: "@/components/ui/card",
  CardTitle: "@/components/ui/card",
  CardDescription: "@/components/ui/card",
  BenefitBgSection: "@/components/ui/bg-section",
  ArticleTitle: "@/components/ui/article-title",
  Image: "@/components/ui/image",
  Text: "@/components/ui/text",
  Container: "@/components/ui/container",
};

function getComponentName(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName
): string | undefined {
  if (t.isJSXIdentifier(name)) {
    // if (name.name === "div") return "NodeContainer";
    if (name.name.includes("Node")) return name.name;
    return `Node` + name.name;
  }
  if (t.isJSXMemberExpression(name)) {
    return (name.property as t.JSXIdentifier).name;
  }
  return undefined;
}

function jsxToNode(
  el: t.JSXElement,
  parent: string | null,
  nodes: Record<string, any>
): string {
  const opening = el.openingElement;
  const compName = getComponentName(opening.name) ?? "div";
  console.log("compName", compName);
  let id = compName === "div" ? "ROOT" : genId();

  const props: Record<string, any> = {};
  opening.attributes.forEach((attr) => {
    if (t.isJSXAttribute(attr)) {
      const key = (attr.name as t.JSXIdentifier).name;
      if (key === "id" && attr.value && t.isStringLiteral(attr.value)) {
        id = attr.value.value;
      } else if (attr.value) {
        if (t.isStringLiteral(attr.value)) props[key] = attr.value.value;
        if (
          t.isJSXExpressionContainer(attr.value) &&
          (t.isStringLiteral(attr.value.expression) ||
            t.isNumericLiteral(attr.value.expression))
        ) {
          props[key] = (attr.value.expression as any).value;
        }
      } else {
        props[key] = true;
      }
    }
  });

  nodes[id] = {
    type: { resolvedName: compName },
    isCanvas: id === "ROOT",
    props,
    custom: { importPath: importPathMap[compName] || "" },
    parent,
    nodes: [] as string[],
    linkedNodes: {},
  };

  el.children.forEach((child) => {
    if (t.isJSXElement(child)) {
      const childId = jsxToNode(child, id, nodes);
      nodes[id].nodes.push(childId);
    } else if (t.isJSXFragment(child)) {
      child.children.forEach((fragChild) => {
        if (t.isJSXElement(fragChild)) {
          const childId = jsxToNode(fragChild, id, nodes);
          nodes[id].nodes.push(childId);
        }
      });
    }
  });

  return id;
}

export function parseTsx(code: string): string {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  let root: t.JSXElement | null = null;
  traverse(ast, {
    ExportNamedDeclaration(path) {
      const decl = path.node.declaration;
      if (t.isFunctionDeclaration(decl) && decl.id?.name === "Component") {
        path.traverse({
          ReturnStatement(p) {
            if (t.isJSXElement(p.node.argument)) {
              root = p.node.argument;
            }
          },
        });
      }
    },
  });

  if (!root) throw new Error("Component not found");

  const nodes: Record<string, any> = {};
  const rootId = jsxToNode(root, null, nodes);
  return JSON.stringify({ rootNodeId: rootId, nodes });
}
