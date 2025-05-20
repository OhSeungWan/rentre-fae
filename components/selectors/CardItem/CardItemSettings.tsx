import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const CardItemSettings = () => {
  return (
    <>
      <ToolbarSection
        title="Card Item 설정"
        props={[
          "link",
          "imgSrc",
          "imgAlt",
          "brand",
          "productName",
          "badgeText",
          "expandImage",
        ]}
      >
        <ToolbarItem propKey="link" type="text" label="링크 URL" />
        <ToolbarItem propKey="imgSrc" type="text" label="이미지 경로" />
        <ToolbarItem propKey="imgAlt" type="text" label="이미지 대체 텍스트" />
        <ToolbarItem propKey="brand" type="text" label="브랜드명" />
        <ToolbarItem propKey="productName" type="text" label="상품명" />
        <ToolbarItem propKey="badgeText" type="text" label="배지 텍스트" />
        <ToolbarItem propKey="expandImage" type="boolean" label="이미지 확대" />
      </ToolbarSection>
    </>
  );
};
