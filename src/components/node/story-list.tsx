import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { StoryList } from "../ui/story-list";
import { Element } from "@craftjs/core";
import { NodeStoryItem } from "./story-item";

const draggable = true;
const droppable = true;

export const NodeStoryListContainer = withNode(StoryList, {
  draggable,
  droppable,
});

export const NodeStoryList = (
  props: React.ComponentProps<typeof StoryList>
) => {
  return (
    <NodeStoryListContainer {...props}>
      <Element
        canvas
        is={NodeStoryItem as typeof NodeStoryItem & string}
        id="first"
      />
      <Element
        canvas
        is={NodeStoryItem as typeof NodeStoryItem & string}
        id="second"
      />
      <Element
        canvas
        is={NodeStoryItem as typeof NodeStoryItem & string}
        id="third"
      />
      <Element
        canvas
        is={NodeStoryItem as typeof NodeStoryItem & string}
        id="fourth"
      />
    </NodeStoryListContainer>
  );
};

;(NodeStoryList as any).craft = {
  displayName: "StoryList",
  props: {},
  custom: {
    importPath: "@/components/story-list",
  },
  related: {
    toolbar: SettingsControl,
  },
};
