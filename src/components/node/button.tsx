import { Button } from "../ui/button";
import { SettingsControl } from "../settings-control";
import { withNode } from "./connector";

const draggable = true;

export const NodeButton = withNode(Button, {
  draggable,
});

;(NodeButton as any).craft = {
  ...(NodeButton as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};
