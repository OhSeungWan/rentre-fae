import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { ComparisonTableRow } from "../ui/comparison-table-row";

const draggable = true;
const droppable = true;

export const NodeComparisonTableRow = withNode(ComparisonTableRow, {
  draggable,
  droppable,
});

(NodeComparisonTableRow as any).craft = {
  ...(NodeComparisonTableRow as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};
