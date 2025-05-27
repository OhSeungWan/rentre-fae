import { Element, UserComponent, useNode } from "@craftjs/core";
import ArticleTitleSettings from "./ArticleTitleSettings";
import { Container } from "../Container";
import { Text } from "../Text";

type ArticleTitleProps = {
  title?: string;
  subTitle?: string;
  subText?: string;
  subTitleTextSize?: string;
};

export const ArticleTitle: UserComponent<ArticleTitleProps> & {
  meta: Record<string, any>;
} = ({
  title = "ArticleTitle",
  subTitle = "ArticleSubTitle",
  subTitleTextSize = "text-[20px]",
  subText,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[24px] py-0"
      ref={(dom: HTMLDivElement | null) => {
        if (dom) {
          connect(dom);
        }
      }}
    >
      <header className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[24px] py-0">
        <Element is={Container} canvas id="article-title-container">
          <Element
            is={Text}
            id="title"
            canvas
            text={title}
            fontSize="32"
            textAlign="center"
            fontWeight="700"
            tagName="h1"
            color={{ r: "44", g: "44", b: "44", a: "1" }}
            margin={["0", "0", "0", "0"]}
          />
          <Element
            is={Text}
            id="subTitle"
            canvas
            text={subTitle}
            fontSize={subTitleTextSize.replace(/[^0-9]/g, "")}
            textAlign="center"
            fontWeight="500"
            tagName="h3"
            color={{ r: "44", g: "44", b: "44", a: "1" }}
            margin={["0", "0", "0", "0"]}
          />
          <Element
            is={Text}
            id="subText"
            canvas
            text={subText}
            fontSize="18"
            textAlign="center"
            fontWeight="400"
            tagName="p"
            color={{ r: "44", g: "44", b: "44", a: "1" }}
            margin={["0", "0", "0", "0"]}
          />
        </Element>
      </header>
      <hr className="mx-auto w-[100px] border-t border-[#B1B9CC]" />
    </div>
  );
};

ArticleTitle.craft = {
  displayName: "ArticleTitle",
  props: {
    title: "여기에 제목을 입력하세요",
    subTitle: "여기에 서브타이틀을 입력하세요",
    subText: "여기에 추가 설명을 입력하세요",
    subTitleTextSize: "text-[20px]",
  },
  custom: { category: "Title" },
  related: {
    toolbar: ArticleTitleSettings,
  },
  rules: {
    canMoveOut: () => true,
  },
};

ArticleTitle.meta = {
  category: "Title",
};
