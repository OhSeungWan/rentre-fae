import { UserComponent, useNode } from "@craftjs/core";
import { SectionTitleSettings } from "./SectionTitleSettings";

type SectionTitleProps = {
  number?: string;
  title?: string;
  subTitle?: string;
  backgroundColor?: string;
};

export const SectionTitle: UserComponent<SectionTitleProps> = ({
  number = 1,
  title = "섹션 제목",
  subTitle = "섹션 부제목",
  backgroundColor = "#e7ebfe",
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(dom: HTMLDivElement | null) => dom && connect(dom)}
      className="flex w-full flex-row items-start justify-start gap-[8px] p-[24px]"
      style={{ backgroundColor }}
    >
      <div className="flex h-[30px] w-[30px] shrink-0 flex-row items-center justify-center rounded-[8px] bg-[#2c2c2c]">
        <div className="flex flex-col items-center justify-center">
          <div className="whitespace-nowrap text-center text-[16px] font-bold leading-[24px] text-[#fff]">
            {number}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start justify-start gap-[8px]">
        <h2 className="self-stretch text-[22px] font-bold leading-[30px] text-[#2c2c2c]">
          {title}
        </h2>
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="self-stretch text-[16px] font-bold leading-[24px] text-[#586177]">
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

SectionTitle.craft = {
  displayName: "SectionTitle",
  props: {
    number: "1",
    title: "비데 필수 스펙 확인하기",
    subTitle: "비데를 고를 때는 방수등급, 노즐 소재, 살균 기능을 확인해주세요!",
    backgroundColor: "#e7ebfe",
  },
  custom: { category: "title" },
  related: {
    toolbar: SectionTitleSettings,
  },
};
