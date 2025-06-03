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

const draggable = true;
const droppable = true;

// Node Components
export const NodeArticleTitleContainer = withNode(ArticleTitleContainer, {
  draggable,
  droppable,
});

export const NodeArticleTitleHeader = withNode(ArticleTitleHeader, {
  draggable,
  droppable,
});

export const NodeArticleTitleMain = withNode(ArticleTitleMain, {
  draggable,
  droppable,
});
NodeArticleTitleMain.craft = {
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeArticleTitleSub = withNode(ArticleTitleSub, {
  draggable,
  droppable,
});
NodeArticleTitleSub.craft = {
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeArticleTitleText = withNode(ArticleTitleText, {
  draggable,
  droppable,
});
NodeArticleTitleText.craft = {
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
        <NodeArticleTitleMain>제목</NodeArticleTitleMain>
        <NodeArticleTitleSub>부제목</NodeArticleTitleSub>
        <NodeArticleTitleText>SubText</NodeArticleTitleText>
      </Element>
      <NodeArticleTitleDivider />
    </NodeArticleTitleContainer>
  );
};

NodeArticleTitle.craft = {
  displayName: "ArticleTitle",
  draggable,
  droppable,
  props: {},
  custom: {
    importPath: "@/components/article-title",
  },
  related: {
    toolbar: SettingsControl,
  },
};
