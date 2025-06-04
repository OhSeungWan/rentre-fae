import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { StoryItem } from "../ui/story-item";

const draggable = true;

export const NodeStoryItem = withNode(StoryItem, { draggable });

NodeStoryItem.craft = {
  ...NodeStoryItem.craft,
  related: {
    toolbar: SettingsControl,
  },
};
