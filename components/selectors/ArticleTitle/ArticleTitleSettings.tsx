import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const ArticleTitleSettings = () => {
  return (
    <>
      <ToolbarSection title="Title" props={["title"]}>
        <ToolbarItem propKey="title" type="text" label="Main Title" />
      </ToolbarSection>

      <ToolbarSection title="Sub Title" props={["subTitle"]}>
        <ToolbarItem propKey="subTitle" type="text" label="Sub Title" />
      </ToolbarSection>

      <ToolbarSection title="Sub Text" props={["subText"]}>
        <ToolbarItem propKey="subText" type="text" label="Sub Text" />
      </ToolbarSection>

      <ToolbarSection title="Sub Title Size" props={["subTitleTextSize"]}>
        <ToolbarItem
          propKey="subTitleTextSize"
          type="text"
          label="Sub Title Size (Tailwind)"
        />
      </ToolbarSection>
    </>
  );
};

export default ArticleTitleSettings;
