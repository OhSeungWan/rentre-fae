import { UserComponent, useNode } from "@craftjs/core";
import ArticleTitleSettings from "./ArticleTitleSettings";

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
      ref={(dom: HTMLDivElement | null) => {
        if (dom) {
          connect(dom);
        }
      }}
    >
      <header className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[24px] py-0">
        <h1 className="self-stretch whitespace-pre-line text-center text-[32px] font-bold leading-[38px] text-[#2c2c2c]">
          {title}
        </h1>
        {subTitle && (
          <h3
            className={`text-[#2c2c2c] w-full whitespace-pre-line text-center leading-[28px] tracking-[-0.01em] ${subTitleTextSize}`}
          >
            {subTitle}
          </h3>
        )}
        {subText && (
          <p className="w-full whitespace-pre-line text-center text-[18px] leading-[24px] text-[#2c2c2c]">
            {subText}
          </p>
        )}
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
};

ArticleTitle.meta = {
  category: "Title",
};
