import { useEditor } from "@craftjs/core";
import React from "react";

export const ControlPanel = () => {
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
    <div className="w-[500px] border-l h-auto">
      <h3 className="py-8 px-42 border-b text-md font-semibold text-left">
        Control Panel
      </h3>
      {active && related.toolbar && React.createElement(related.toolbar)}
    </div>
  );
};
