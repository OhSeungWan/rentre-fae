import { SettingsControl } from "../settings-control";
import { AutoHeightImage } from "../ui/image";
import { withNode } from "./connector";

export const NodeImage = withNode(AutoHeightImage);

(NodeImage as any).craft = {
  displayName: "Image",
  props: {
    src: "/hero.png",
  },
  related: {
    toolbar: SettingsControl,
  },
};
