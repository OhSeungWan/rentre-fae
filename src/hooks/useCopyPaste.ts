import { useEditor } from "@craftjs/core";
import { useCallback, useEffect, useRef } from "react";

import type { Node, NodeTree } from "@craftjs/core";

// simple random id generator similar to nanoid
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useCopyPaste = () => {
  const { query, actions } = useEditor();
  const clipboard = useRef<NodeTree[] | null>(null);

  const getCloneTree = useCallback(
    (tree: NodeTree) => {
      const newNodes = {};
      const changeNodeId = (node: Node, newParentId?: string) => {
        const newNodeId = generateId();
        const childNodes = node.data.nodes.map((childId) =>
          changeNodeId(tree.nodes[childId], newNodeId)
        );
        const linkedNodes = Object.keys(node.data.linkedNodes).reduce(
          (acc, id) => {
            const newLinkedNodeId = changeNodeId(
              tree.nodes[node.data.linkedNodes[id]],
              newNodeId
            );
            return {
              ...acc,
              [id]: newLinkedNodeId,
            };
          },
          {}
        );

        let tmpNode = {
          ...node,
          id: newNodeId,
          data: {
            ...node.data,
            parent: newParentId || node.data.parent,
            nodes: childNodes,
            linkedNodes,
          },
        };
        let freshNode = query.parseFreshNode(tmpNode).toNode();
        newNodes[newNodeId] = freshNode;
        return newNodeId;
      };

      const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId]);
      return {
        rootNodeId,
        nodes: newNodes,
      };
    },
    [query]
  );

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
          console.log("tree", tree);
          const cloned = getCloneTree(tree);
          console.log("cloned", cloned);
          console.log("parentId", parentId);
          actions.addNodeTree(cloned, parentId, index);
          index += 1;
        });
      }
    };
    document.addEventListener("keydown", handler);
    const iframe = document.getElementById(
      "canvas-iframe"
    ) as HTMLIFrameElement | null;
    const iframeDoc = iframe?.contentWindow?.document;
    iframeDoc?.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
      iframeDoc?.removeEventListener("keydown", handler);
    };
  }, [query, actions, getCloneTree]);
};
