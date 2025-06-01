import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const CardListSettings = () => {
  return (
    <>
      <ToolbarSection
        title="Card List 레이아웃 설정"
        props={["backgroundColor"]}
      >
        <ToolbarItem propKey="backgroundColor" type="color" label="배경색" />
      </ToolbarSection>
    </>
  );
};
