import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";
import { useNode } from "@craftjs/core";

export const ComparisonTableHeaderSettings = () => {
  const {
    node: {
      data: { props },
    },
    actions: { setProp },
  } = useNode((node) => ({ node }));

  const { columnCount = 5, columns = [] } = props;

  // ✨ 컬럼 수에 맞춰 배열 보정
  const filledColumns = Array.from(
    { length: columnCount },
    (_, i) => columns[i] ?? ""
  );

  const handleAddColumn = () => {
    setProp((prop) => {
      prop.columnCount = (prop.columnCount || 0) + 1;
      prop.columns = [...(prop.columns || []), ""];
    });
  };

  const handleRemoveColumn = () => {
    setProp((prop) => {
      if ((prop.columnCount || 0) > 1) {
        prop.columnCount = prop.columnCount - 1;
        prop.columns = (prop.columns || []).slice(0, -1);
      }
    });
  };

  return (
    <>
      <ToolbarSection title="컬럼 이름 설정">
        {[...Array(filledColumns.length)].map((_, i) => (
          <ToolbarItem
            key={i}
            propKey="columns"
            index={i}
            type="text"
            label={`컬럼 ${i + 1}`}
          />
        ))}
      </ToolbarSection>
    </>
  );
};
