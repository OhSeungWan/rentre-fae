import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const SectionTitleSettings = () => {
  return (
    <>
      <ToolbarSection
        title="Section Title 설정"
        props={["number", "title", "subTitle", "backgroundColor"]}
      >
        <ToolbarItem propKey="number" type="text" label="순번" />
        <ToolbarItem propKey="title" type="text" label="타이틀" />
        <ToolbarItem propKey="subTitle" type="text" label="서브 타이틀" />
        <ToolbarItem propKey="backgroundColor" type="color" label="배경색" />
      </ToolbarSection>
    </>
  );
};
