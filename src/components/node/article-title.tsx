import React from "react";
import { Element } from "@craftjs/core";
import { withNode } from "./connector";
import { SettingsControl } from "../settings-control";
import {
  ArticleTitleContainer,
  ArticleTitleHeader,
  ArticleTitleMain,
  ArticleTitleSub,
  ArticleTitleText,
  ArticleTitleDivider,
} from "../ui/article-title";
import { NodeText } from "./Text";
import { cn } from "@/lib/utils";

const draggable = true;
const droppable = true;

// Node Components
export const NodeArticleTitleContainer = withNode(ArticleTitleContainer, {
  draggable,
  droppable,
});

export const NodeArticleTitleHeader = withNode(ArticleTitleHeader, {
  droppable,
});
(NodeArticleTitleHeader as any).craft = {
  custom: {
    importPath: "@/components/ui/article-title",
  },
};

export const NodeArticleTitleMain = withNode(ArticleTitleMain, {
  droppable,
});
(NodeArticleTitleMain as any).craft = {
  draggable,
  droppable,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeArticleTitleSub = withNode(ArticleTitleSub, {
  droppable,
});
(NodeArticleTitleSub as any).craft = {
  draggable,
  droppable,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeArticleTitleText = withNode(ArticleTitleText, {
  droppable,
});
(NodeArticleTitleText as any).craft = {
  draggable,
  droppable,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeArticleTitleDivider = withNode(ArticleTitleDivider, {
  draggable: true,
  droppable: false,
});

// 최종 NodeArticleTitle 컴포넌트
export const NodeArticleTitle = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <NodeArticleTitleContainer {...props}>
      <Element
        canvas
        id="article-title-header"
        is={NodeArticleTitleHeader as typeof NodeArticleTitleHeader & string}
      >
        <NodeText
          id="article-title-text"
          className={cn(
            "self-stretch whitespace-pre-line text-center text-[32px] font-bold leading-[38px] text-[#2c2c2c]"
          )}
          tagName="h1"
          text="제목"
        />

        <NodeText
          id="article-subTitle-text"
          className={cn(
            "text-[#2c2c2c] w-full whitespace-pre-line break-keep text-center leading-[28px] tracking-[-0.01em]"
          )}
          tagName="h3"
          text="부제목"
        />
        <NodeText
          id="article-sub-text"
          className={cn(
            "w-full whitespace-pre-line break-keep text-center text-[18px] leading-[24px] text-[#2c2c2c]"
          )}
          tagName="p"
          text="내용"
        />
      </Element>
      <NodeArticleTitleDivider />
    </NodeArticleTitleContainer>
  );
};

NodeArticleTitle.craft = {
  displayName: "ArticleTitle",
  props: {},
  custom: {
    importPath: "@/components/ui/article-title",
  },
  related: {
    toolbar: SettingsControl,
  },
};
