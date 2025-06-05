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
      events: { selected: false, hovered: false, dragged: false },
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
  const clipboard = useRef<NodeTree[] | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        const ids = query.getEvent("selected").all();
        if (ids.length > 0) {
          clipboard.current = ids.map((id) => query.node(id).toNodeTree());
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
        if (!clipboard.current) return;
        e.preventDefault();
        const target = query.getEvent("selected").first();
        if (!target) return;
        const parentId = query.node(target).get().data.parent as string;
        const parentNode = query.node(parentId).get();
        let index = parentNode.data.nodes.indexOf(target) + 1;
        clipboard.current.forEach((tree) => {
          const cloned = cloneTree(tree);
          actions.addNodeTree(cloned, parentId, index);
          index += 1;
        });
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
