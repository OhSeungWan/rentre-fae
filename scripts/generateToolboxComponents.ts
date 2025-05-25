const babel = require("@babel/core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");

const SELECTORS_DIR = path.resolve(__dirname, "../components/selectors");

function extractMetaFromFile(filePath: string) {
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  let exportName = "";
  const result: any = {};

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const declaration = path.node.declaration;
      if (
        declaration?.type === "VariableDeclaration" &&
        declaration.declarations[0].id.type === "Identifier"
      ) {
        exportName = declaration.declarations[0].id.name;
      }
    },
    AssignmentExpression(path) {
      const left = path.node.left;
      if (
        left.type === "MemberExpression" &&
        left.object.type === "Identifier" &&
        left.property.type === "Identifier" &&
        left.property.name === "meta"
      ) {
        result.meta = eval(
          `(${
            babel
              .transformSync(code)
              ?.code?.match(/\.meta\s*=\s*(\{[\s\S]*?\})/)?.[1]
          })`
        );
      }
    },
  });

  return {
    name: exportName,
    label: result.meta?.label || exportName,
    category: result.meta?.category || "Misc",
    icon: result.meta?.icon || "📦",
    defaultProps: result.meta?.defaultProps || {},
  };
}

function getComponentFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((dir) => {
      const baseName = dir.name;
      const indexPath = path.join(dirPath, baseName, "index.tsx");
      const namedPath = path.join(dirPath, baseName, `${baseName}.tsx`);

      if (fs.existsSync(indexPath)) return { name: baseName, file: indexPath };
      if (fs.existsSync(namedPath)) return { name: baseName, file: namedPath };

      return null;
    })
    .filter(Boolean); // remove null
}

function main() {
  const files = getComponentFiles(SELECTORS_DIR);

  const components = files.map(({ name, file }) => {
    const meta = extractMetaFromFile(file);
    return {
      name: name, // folder name = component name
      label: meta.label,
      category: meta.category,
      icon: meta.icon,
      defaultProps: meta.defaultProps,
    };
  });

  const output = `export const TOOLBOX_COMPONENTS = [\n${components
    .map((c) => {
      return `  {
    name: "${c.name}",
    label: "${c.label}",
    category: "${c.category}",
    icon: "${c.icon}",
    defaultProps: ${JSON.stringify(c.defaultProps, null, 2)},
  },`;
    })
    .join("\n")}\n];\n`;

  fs.writeFileSync(
    path.resolve(__dirname, "../components/registry/TOOLBOX_COMPONENTS.ts"),
    output
  );
  console.log("✅ TOOLBOX_COMPONENTS.ts 생성 완료");
}

main();

// {TOOLBOX_COMPONENTS.map((item) => (
//   <div
//     key={item.name}
//     ref={(ref) => ref && create(ref, React.createElement(ComponentsMap[item.name], item.defaultProps))}
//   >
//     <span>{item.icon}</span>
//     <span>{item.label}</span>
//   </div>
// ))}
