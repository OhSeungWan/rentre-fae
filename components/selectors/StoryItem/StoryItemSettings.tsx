import React from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";

export const StoryItemSettings = () => {
  return (
    <>
      <ToolbarSection
        title="Story Item 설정"
        props={["imgSrc", "title", "subTitle", "linkUrl", "bg"]}
      >
        <ToolbarItem propKey="imgSrc" type="text" label="이미지 경로" />
        <ToolbarItem propKey="title" type="text" label="타이틀" />
        <ToolbarItem propKey="subTitle" type="text" label="서브 타이틀" />
        <ToolbarItem propKey="linkUrl" type="text" label="링크 URL" />
        <ToolbarItem propKey="bg" type="text" label="배경 클래스 or 색상" />
      </ToolbarSection>
    </>
  );
};
