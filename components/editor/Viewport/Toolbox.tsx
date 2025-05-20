import { Element, useEditor } from "@craftjs/core";
import { Tooltip } from "@mui/material";
import React from "react";
import { styled } from "styled-components";
import { LuSquareDashed } from "react-icons/lu";
import { LuType } from "react-icons/lu";
import ButtonSvg from "../../../public/icons/toolbox/button.svg";
// import SquareSvg from "../../../public/icons/toolbox/rectangle.svg";
// import TypeSvg from "../../../public/icons/toolbox/text.svg";
import YoutubeSvg from "../../../public/icons/toolbox/video-line.svg";
import { Button } from "../../selectors/Button";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors/Text";
import { Video } from "../../selectors/Video";
import { ArticleTitle } from "components/selectors/ArticleTitle";
import { CardList } from "components/selectors/CardList";
import { StoryItem } from "components/selectors/StoryItem";
import { StoryList } from "components/selectors/StoryList";
import { BottomCtaBtn } from "components/selectors/BottomCtaButton";
import { Footer } from "components/selectors/Footer";
import { SectionTitle } from "components/selectors/SectionTitle";
import { CardItem } from "components/selectors/CardItem";

const ToolboxDiv = styled.div<{ $enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.$enabled ? `width: 0;` : "")}
  ${(props) => (!props.$enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ $move?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 28px;
    height: 28px;
    fill: #707070;
  }
  ${(props) =>
    props.$move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      $enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3 gap-3">
        <div
          ref={(ref) => {
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            );
          }}
        >
          <Tooltip title="Container" placement="right">
            <Item $move>
              <LuSquareDashed viewBox="-3 -3 24 24" />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) => {
            create(
              ref,
              <Text fontSize="12" textAlign="left" text="Hi there" />
            );
          }}
        >
          <Tooltip title="Text" placement="right">
            <Item $move>
              <LuType viewBox="-3 -3 28 28" />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) => {
            create(ref, <StoryItem />);
          }}
        >
          스토리 아이템
        </div>
        <div
          ref={(ref) => {
            create(ref, <StoryList />);
          }}
        >
          스토리 리스트
        </div>
        <div
          ref={(ref) => {
            create(ref, <Footer />);
          }}
        >
          푸터
        </div>
        <div
          ref={(ref) => {
            create(ref, <BottomCtaBtn />);
          }}
        >
          cta
        </div>
        <div
          ref={(ref) => {
            create(ref, <Button />);
          }}
        >
          버튼
        </div>
        <div
          ref={(ref) => {
            create(ref, <SectionTitle />);
          }}
        >
          섹션 제목
        </div>
        <div
          ref={(ref) => {
            create(ref, <ArticleTitle />);
          }}
        >
          아티클 제목
        </div>
        <div
          ref={(ref) => {
            create(ref, <CardList />);
          }}
        >
          카드 리스트
        </div>
        <div
          ref={(ref) => {
            create(ref, <CardItem />);
          }}
        >
          카드 아이템
        </div>
      </div>
    </ToolboxDiv>
  );
};
