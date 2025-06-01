import { UserComponent, useNode } from "@craftjs/core";
import { BgSectionSettings } from "./BgSectionSettings";

type BgSectionProps = {
  type?: "primary" | "benefit";
  title?: string;
  contentList: string[];
};

export const BgSection: UserComponent<BgSectionProps> = ({
  type = "benefit",
  title,
  contentList,
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
      {type === "primary" ? (
        <PrimaryBgSection title={title} contentList={contentList} />
      ) : (
        <BenefitBgSection title={title} contentList={contentList} />
      )}
    </div>
  );
};

const BenefitBgSection = ({
  title,
  contentList,
}: {
  title?: string;
  contentList: string[];
}) => (
  <div className="flex w-full flex-col items-center justify-center px-[24px]">
    <div className="flex w-full flex-col items-start justify-start gap-[16px] rounded-[12px] bg-[#f5f5f5] p-[18px]">
      {title && (
        <div className="flex flex-row items-center justify-center self-stretch">
          <h3 className="whitespace-nowrap text-[20px] font-bold leading-[28px] text-[#2c2c2c]">
            {title}
          </h3>
        </div>
      )}
      <div className="flex flex-col items-start justify-center gap-[18px] self-stretch">
        {contentList.map((content, index) => (
          <div key={index} className="flex flex-col self-stretch gap-[8px]">
            <div className="flex flex-row items-start justify-start gap-[8px] self-stretch">
              <div className="flex h-[22px] w-[22px] shrink-0 flex-row items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <circle cx="10.4102" cy="10" r="10" fill="#525252" />
                  <path
                    d="M6.53516 9.75L9.14373 12.3586C9.22184 12.4367 9.34847 12.4367 9.42658 12.3586L14.2852 7.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1 text-[16px] font-medium leading-[24px] text-[#586177]">
                {content}
              </div>
            </div>
            {index !== contentList.length - 1 && (
              <div className="h-0 border-[1px] border-dashed border-[#e2e6ec] self-stretch"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PrimaryBgSection = ({
  title,
  contentList,
}: {
  title?: string;
  contentList: string[];
}) => (
  <div className="flex w-full flex-col items-center justify-center bg-[#f9fafb] px-[51.5px] py-[48px]">
    <div className="flex w-full flex-col items-start justify-start gap-[20px]">
      {title && (
        <p className="self-stretch text-center text-[22px] font-bold leading-[30px] text-[#2c2c2c]">
          {title}
        </p>
      )}
      <div className="flex flex-col items-start justify-start gap-[12px] self-stretch">
        {contentList.map((content, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-start gap-[12px] self-stretch rounded-[12px] bg-[#fff] p-[16px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <circle cx="10.5742" cy="10" r="10" fill="#3531FF" />
              <path
                d="M6.69922 9.75L9.3078 12.3586C9.3859 12.4367 9.51254 12.4367 9.59064 12.3586L14.4492 7.5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex-1 text-[16px] font-bold leading-[24px] text-[#586177]">
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

BgSection.craft = {
  displayName: "BgSection",
  props: {
    type: "benefit",
    title: "여기에 제목을 입력하세요",
    contentList: ["첫 번째 항목", "두 번째 항목"],
  },
  related: {
    toolbar: BgSectionSettings,
  },
};
