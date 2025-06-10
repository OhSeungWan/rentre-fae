import { useEditor } from "@craftjs/core";
import React from "react";

export const ControlPanel = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const selectedId = query.getEvent("selected").first();
    const node = selectedId && state.nodes[selectedId];
    return {
      active: selectedId,
      related: node?.related,
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
