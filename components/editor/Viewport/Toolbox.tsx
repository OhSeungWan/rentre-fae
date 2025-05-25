import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEditor } from "@craftjs/core";
import { Tooltip } from "@mui/material";
import { ComponentsMap } from "components/registry/ComponentsMap";
import React from "react";
import { TOOLBOX_COMPONENTS } from "components/registry/TOOLBOX_COMPONENTS";

export const Toolbox = () => {
  const {
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = TOOLBOX_COMPONENTS.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  );

  return (
    <div className="min-w-[400px] bg-white border-r h-full">
      <Tabs defaultValue="All" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4">
          {["All", "Content", "Media", "Footer"].map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeCategory}>
          <div className="grid grid-cols-2 gap-4 p-4">
            {filtered.map((item) => (
              <div
                key={item.name}
                ref={(ref) => {
                  if (ref) {
                    create(
                      ref,
                      React.createElement(
                        ComponentsMap[item.name],
                        item.defaultProps
                      )
                    );
                  }
                }}
                className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100 cursor-move"
              >
                <Tooltip title={item.label}>
                  <div className="text-2xl">{item.icon}</div>
                </Tooltip>

                <span className="text-xs mt-1 text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
