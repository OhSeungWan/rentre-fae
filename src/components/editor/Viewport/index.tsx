import { useEditor, ROOT_NODE } from "@craftjs/core";
import cx from "classnames";
import React, { useEffect } from "react";
import { useClipboard } from "@/lib/clipboard";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toolbox } from "./Toolbox";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions, addNodeTree, selectNode },
    query,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    query,
  }));
  const { tree, setTree } = useClipboard();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!enabled) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        const id = query.getEvent("selected").first();
        if (id) {
          e.preventDefault();
          const t = query.node(id).toNodeTree();
          setTree(t);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "v") {
        if (!tree) return;
        e.preventDefault();
        const selected = query.getEvent("selected").first();
        const parent = selected
          ? query.node(selected).get().data.parent
          : ROOT_NODE;
        const index = selected
          ? query.node(parent).childNodes().indexOf(selected) + 1
          : undefined;
        addNodeTree(tree, parent, index);
        selectNode(tree.rootNodeId);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, tree, query, addNodeTree, selectNode, setTree]);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <div
        className={cx(["flex h-full overflow-hidden flex-row w-full fixed"])}
      >
        <Toolbox />
        <div className="page-container flex flex-1 h-full flex-col">
          <Header />
          <div
            className={cx([
              "craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto",
              { "bg-renderer-gray": enabled },
            ])}
            ref={(ref) => {
              connectors.select(connectors.hover(ref, null), null);
            }}
          >
            <div className="relative flex-col flex items-center pt-8">
              {children}
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
