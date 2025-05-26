import { useEditor } from "@craftjs/core";
import React from "react";

export * from "./ToolbarItem";
export * from "./ToolbarSection";
export * from "./ToolbarTextInput";
export * from "./ToolbarDropdown";

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div className="py-1 h-full">
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div
          className="px-5 py-2 flex flex-col items-center h-full justify-center text-center"
          style={{
            color: "rgba(0, 0, 0, 0.5607843137254902)",
            fontSize: "11px",
          }}
        >
          <h2 className="pb-1">속성을 편집하려면 컴포넌트를 클릭하세요</h2>
          <h2>하단 레이어에서도 클릭으로 선택가능합니다.</h2>
        </div>
      )}
    </div>
  );
};
