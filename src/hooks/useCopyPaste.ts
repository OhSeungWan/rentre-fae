import { useEditor } from "@craftjs/core";
import { useEffect, useRef } from "react";

import type { Node, NodeTree } from "@craftjs/core";

// simple random id generator similar to nanoid
const generateId = () => Math.random().toString(36).substr(2, 9);

function cloneTree(tree: NodeTree): NodeTree {
  const idMap: Record<string, string> = {};
  Object.keys(tree.nodes).forEach((id) => {
    idMap[id] = generateId();
  });
  const newNodes: Record<string, Node> = {};
  Object.entries(tree.nodes).forEach(([oldId, node]) => {
    const newId = idMap[oldId];
    newNodes[newId] = {
      ...node,
      id: newId,
      data: {
        ...node.data,
        parent: node.data.parent ? idMap[node.data.parent] || node.data.parent : null,
        nodes: node.data.nodes.map((child) => idMap[child]),
        linkedNodes: Object.fromEntries(
          Object.entries(node.data.linkedNodes || {}).map(([key, val]) => [key, idMap[val]])
        ),
      },
    };
  });
  return { rootNodeId: idMap[tree.rootNodeId], nodes: newNodes };
}

export const useCopyPaste = () => {
  const { query, actions } = useEditor();
  const clipboard = useRef<NodeTree | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        const id = query.getEvent("selected").first();
        if (id) {
          clipboard.current = query.node(id).toNodeTree();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
        if (!clipboard.current) return;
        e.preventDefault();
        const target = query.getEvent("selected").first();
        if (!target) return;
        const parentId = query.node(target).get().data.parent as string;
        const parentNode = query.node(parentId).get();
        const index = parentNode.data.nodes.indexOf(target) + 1;
        const cloned = cloneTree(clipboard.current);
        actions.addNodeTree(cloned, parentId, index);
      }
    };
    document.addEventListener("keydown", handler);
    const iframe = document.getElementById("canvas-iframe") as HTMLIFrameElement | null;
    const iframeDoc = iframe?.contentWindow?.document;
    iframeDoc?.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
      iframeDoc?.removeEventListener("keydown", handler);
    };
  }, [query, actions]);
};
