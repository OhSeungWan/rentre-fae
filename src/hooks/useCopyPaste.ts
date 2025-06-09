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
      dom: null,
      events: { selected: false, hovered: false, dragged: false },
      data: {
        ...node.data,
        parent: node.data.parent ? idMap[node.data.parent] || node.data.parent : null,
        nodes: node.data.nodes.map((child) => idMap[child]),
        linkedNodes: Object.entries(node.data.linkedNodes || {}).reduce(
          (acc, [key, val]) => {
            acc[key] = idMap[val];
            return acc;
          },
          {} as Record<string, string>
        ),
      },
    };
  });
  return { rootNodeId: idMap[tree.rootNodeId], nodes: newNodes };
}

export const useCopyPaste = () => {
  const { query, actions } = useEditor();
  const clipboard = useRef<NodeTree[] | null>(null);

  const isEditableTarget = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      target.isContentEditable
    );
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) {
        // allow normal copy/paste behaviour inside editable elements
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        const ids = query.getEvent("selected").all();
        if (ids.length > 0) {
          e.preventDefault();
          clipboard.current = ids.map((id) => query.node(id).toNodeTree());
        } else {
          clipboard.current = null;
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
        if (!clipboard.current) return;
        e.preventDefault();
        const target = query.getEvent("selected").first();
        if (!target) return;

        let targetNode: any = null;
        try {
          targetNode = query.node(target).get();
        } catch (err) {
          return;
        }
        if (!targetNode) return;

        const parentId = targetNode.data.parent as string;
        let parentNode: any = null;
        try {
          parentNode = query.node(parentId).get();
        } catch (err) {
          return;
        }
        if (!parentNode) return;

        let index = parentNode.data.nodes.indexOf(target) + 1;
        clipboard.current.forEach((tree) => {
          const cloned = cloneTree(tree);
          actions.addNodeTree(cloned, parentId, index);
          index += 1;
        });
        clipboard.current = null;
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
