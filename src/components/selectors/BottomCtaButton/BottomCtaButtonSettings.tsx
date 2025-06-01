import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const BottomCtaBtnSettings = () => {
  return (
    <>
      <ToolbarSection title="CTA Button URL" props={["url"]}>
        <ToolbarItem propKey="url" type="text" label="URL" />
      </ToolbarSection>

      <ToolbarSection title="CTA Title" props={["title"]}>
        <ToolbarItem propKey="title" type="text" label="Title" />
      </ToolbarSection>

      <ToolbarSection title="Button Text" props={["buttonText"]}>
        <ToolbarItem propKey="buttonText" type="text" label="Button Text" />
      </ToolbarSection>
    </>
  );
};
