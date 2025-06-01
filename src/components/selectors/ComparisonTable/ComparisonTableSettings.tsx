import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";
import { useNode } from "@craftjs/core";

export const ComparisonTableSettings = () => {
  const {
    node: {
      data: { props },
    },
    actions: { setProp },
  } = useNode((node) => ({ node }));

  const { columnCount = 3, rowCount = 2 } = props;

  return (
    <>
      <ToolbarSection title="테이블 설정">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">컬럼 수</label>
            <input
              type="number"
              min={1}
              max={10}
              value={columnCount}
              onChange={(e) =>
                setProp((props) => {
                  props.columnCount = parseInt(e.target.value);
                })
              }
              className="w-16 rounded border px-2 py-1 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">행 수</label>
            <input
              type="number"
              min={1}
              max={20}
              value={rowCount}
              onChange={(e) =>
                setProp((props) => {
                  props.rowCount = parseInt(e.target.value);
                })
              }
              className="w-16 rounded border px-2 py-1 text-sm"
            />
          </div>
        </div>
      </ToolbarSection>
    </>
  );
};
