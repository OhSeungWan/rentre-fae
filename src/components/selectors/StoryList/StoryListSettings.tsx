import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const StoryListSettings = () => {
  return (
    <>
      <ToolbarSection title="Story List 레이아웃 설정" props={["background"]}>
        <ToolbarItem propKey="background" type="color" label="배경색" />
      </ToolbarSection>
    </>
  );
};
