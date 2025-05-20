import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const FooterSettings = () => {
  return (
    <>
      <ToolbarSection title="HashTags" props={["hashTags"]}>
        <ToolbarItem
          propKey="hashTags"
          type="array"
          label="해시태그 (쉼표로 구분)"
        />
      </ToolbarSection>

      <ToolbarSection title="Story List" props={["storyList"]}>
        <ToolbarItem
          propKey="storyList"
          type="array"
          label="스토리 목록 (JSON 형식)"
        />
      </ToolbarSection>

      <ToolbarSection title="CTA Button" props={["cta"]}>
        <ToolbarItem propKey="cta" type="object" label="CTA 정보 (JSON 형식)" />
      </ToolbarSection>
    </>
  );
};
