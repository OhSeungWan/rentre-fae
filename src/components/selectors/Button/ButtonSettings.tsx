import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";
import { ToolbarRadio } from "../../editor/Toolbar/ToolbarRadio";

export const ButtonSettings = () => {
  return (
    <>
      <ToolbarSection title="Button Type" props={["type"]}>
        <ToolbarItem propKey="type" type="radio" label="Type">
          <ToolbarRadio value="primary" label="Primary" />
          <ToolbarRadio value="secondary" label="Secondary" />
          <ToolbarRadio value="teritary" label="Teritary" />
          <ToolbarRadio value="link" label="Link" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection title="Text" props={["buttonText"]}>
        <ToolbarItem propKey="buttonText" type="text" label="Button Text" />
      </ToolbarSection>

      <ToolbarSection title="Link" props={["link"]}>
        <ToolbarItem propKey="link" type="text" label="Link URL" />
      </ToolbarSection>

      <ToolbarSection title="Target" props={["targetBlank"]}>
        <ToolbarItem
          propKey="targetBlank"
          type="boolean"
          label="Open in New Tab"
        />
      </ToolbarSection>

      <ToolbarSection title="Arrow Icon" props={["hasArrowButton"]}>
        <ToolbarItem
          propKey="hasArrowButton"
          type="boolean"
          label="Show Arrow Icon"
        />
      </ToolbarSection>
    </>
  );
};
