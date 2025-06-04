import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { ComparisonTable } from "../ui/comparison-table";
import { Element } from "@craftjs/core";
import { NodeComparisonTableHeader } from "./comparison-table-header";
import { NodeComparisonTableRow } from "./comparison-table-row";

const draggable = true;
const droppable = true;

export const NodeComparisonTableContainer = withNode(ComparisonTable, {
  draggable,
  droppable,
});

export const NodeComparisonTable = (
  props: React.ComponentProps<typeof ComparisonTable>
) => {
  const { rowCount = 2, columnCount = 3, ...rest } = props;
  return (
    <NodeComparisonTableContainer rowCount={rowCount} columnCount={columnCount} {...rest}>
      <Element canvas is={NodeComparisonTableHeader as any} id="comparison-header" columnCount={columnCount} />
      {Array.from({ length: rowCount }).map((_, i) => (
        <Element
          canvas
          is={NodeComparisonTableRow as any}
          id={`comparison-row-${i}`}
          key={i}
          custom={{ columnCount }}
        />
      ))}
    </NodeComparisonTableContainer>
  );
};

;(NodeComparisonTable as any).craft = {
  displayName: "ComparisonTable",
  props: {},
  custom: {
    importPath: "@/components/comparison-table",
  },
  related: {
    toolbar: SettingsControl,
  },
};
