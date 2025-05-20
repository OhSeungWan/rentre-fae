import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";
import { ToolbarRadio } from "../../editor/Toolbar/ToolbarRadio";

export const BgSectionSettings = () => {
  return (
    <>
      <ToolbarSection title="Type" props={["type"]}>
        <ToolbarItem propKey="type" type="radio" label="Type">
          <ToolbarRadio value="primary" label="Primary" />
          <ToolbarRadio value="benefit" label="Benefit" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection title="Title" props={["title"]}>
        <ToolbarItem propKey="title" type="text" label="Title" />
      </ToolbarSection>

      <ToolbarSection title="Content List" props={["contentList"]}>
        <ToolbarItem
          propKey="contentList"
          type="array"
          label="Contents (쉼표로 구분)"
        />
      </ToolbarSection>
    </>
  );
};
