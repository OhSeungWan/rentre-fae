import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { ComparisonTableHeader } from "../ui/comparison-table-header";

const draggable = true;
const droppable = true;

export const NodeComparisonTableHeader = withNode(ComparisonTableHeader, {
  draggable,
  droppable,
});

(NodeComparisonTableHeader as any).craft = {
  ...(NodeComparisonTableHeader as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};
