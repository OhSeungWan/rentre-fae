import { withNode } from "./connector";
import { Container } from "../ui/container";

export const NodeContainer = withNode(Container);

(NodeContainer as any).craft = {
  displayName: "Container",
  props: {},
  custom: {
    importPath: "@/components/ui/container",
  },
};
