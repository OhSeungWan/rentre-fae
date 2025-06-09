import { cn } from "@/lib/utils";
import { ImportantTitle } from "../ui/important-title";
import { Text } from "../ui/text";
import { withNode } from "./connector";

import { NodeText } from "./Text";
import { SettingsControl } from "../settings-control";

export const NodeImportantTitleText = withNode(Text);
export const NodeImportantTitleContainer = withNode(ImportantTitle);

export const NodeImportantTitle = () => {
  return (
    <NodeImportantTitleContainer
      className={cn(
        "flex gap-13 items-center w-full p-16 bg-white rounded-[12px] shadow-[4px_9px_30px_0px_rgba(0,0,0,0.09);]"
      )}
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
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
      <NodeText
        text="제목입력"
        id="important-title-text"
        className="w-full text-[#586177] text-16 font-bold leading-[24px]"
      />
      {/* <NodeImportantTitleText text="제목입력" /> */}
    </NodeImportantTitleContainer>
  );
};

NodeImportantTitle.craft = {
  ...NodeImportantTitle.craft,
  displayName: "ImportantTitle",
  custom: {
    importPath: "@/components/ui/important-title",
  },
  related: {
    toolbar: SettingsControl,
  },
};
