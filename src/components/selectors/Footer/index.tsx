import { UserComponent, useNode } from "@craftjs/core";

// import { EditorKeywordCard } from "@pages/story-pages/ui/EditorKeywordCard";

import { FooterSettings } from "./FooterSettings";
import { BottomCtaButton } from "../BottomCtaButton";
import { StoryList } from "../StoryList";

type FooterProps = {
  hashTags?: string[];
  storyList?: {
    imgSrc: string;
    title: string;
    subTitle: string;
    linkUrl: string;
    bg?: string;
  }[];
  cta?: {
    url: string;
    title: string;
    buttonText: string;
  };
};

export const Footer: UserComponent<FooterProps> = ({
  hashTags: _hashTags,
  storyList,
  cta,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <footer
      ref={(dom: HTMLDivElement | null) => {
        if (dom) connect(dom);
      }}
      className="flex w-full flex-col items-start justify-start gap-[56px] bg-[#fff] px-0 pt-0"
    >
      <div className="w-full px-48">
        <hr className="w-full border-t border-[#cbd2e3]" />
      </div>
      <div className="flex w-full flex-col gap-[40px]">
        {/* {hashTags && <EditorKeywordCard hashTags={hashTags} />} */}
        {storyList && (
          <div className="flex w-full flex-col items-start justify-start px-0 pb-[40px] pt-0">
            <div className="flex flex-col items-center justify-start gap-[20px] self-stretch bg-[#fff] px-[16px] pb-[60px] pt-[24px]">
              <div className="flex flex-row items-center justify-start self-stretch">
                <div className="flex-1 text-[18px] font-bold leading-normal text-[#586177]">
                  관련 글
                </div>
              </div>
              <StoryList />
            </div>
          </div>
        )}
      </div>
      {cta && <BottomCtaButton {...cta} />}
    </footer>
  );
};

Footer.craft = {
  displayName: "Footer",
  props: {
    hashTags: ["태그1", "태그2"],
    storyList: [
      {
        imgSrc: "/sample.jpg",
        title: "샘플 제목",
        subTitle: "샘플 부제목",
        linkUrl: "/",
      },
    ],
    cta: {
      url: "/",
      title: "CTA 제목",
      buttonText: "CTA 버튼",
    },
  },
  related: {
    toolbar: FooterSettings,
  },
};
