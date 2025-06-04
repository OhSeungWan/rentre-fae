import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import { StoryItem } from "../ui/story-item";

const draggable = true;

export const NodeStoryItem = withNode(StoryItem, { draggable });

;(NodeStoryItem as any).craft = {
  ...(NodeStoryItem as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};
