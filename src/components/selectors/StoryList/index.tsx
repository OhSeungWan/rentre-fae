import { UserComponent, useNode, Element } from "@craftjs/core";
import { StoryItem } from "../StoryItem";
import { StoryListSettings } from "./StoryListSettings";

type StoryListProps = {
  background?: string;
};

export const StoryList: UserComponent<StoryListProps> = ({ background }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(dom: HTMLDivElement | null) => {
        if (dom) connect(dom);
      }}
      className="flex flex-col gap-20"
      style={{ background }}
    >
      <Element is={StoryItem} canvas id="first" />
      <Element is={StoryItem} canvas id="second" />
      <Element is={StoryItem} canvas id="third" />
      <Element is={StoryItem} canvas id="fourth" />
    </div>
  );
};

StoryList.craft = {
  displayName: "StoryList",
  props: {
    background: "#ffffff",
  },
  related: {
    toolbar: StoryListSettings,
  },
};
