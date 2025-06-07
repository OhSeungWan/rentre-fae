import { withNode } from "@/components/node/connector";
import { SettingsControl } from "@/components/settings-control";

import {
  BenefitBgSectionContainer,
  BenefitBgSectionItem,
  BenefitBgSectionTitle,
  BgSectionContent,
} from "../ui/bg-section";
import { Element } from "@craftjs/core";
import { NodeText } from "./Text";
import { cn } from "@/lib/utils";
import { NodeContainer } from "./container";
const draggable = true;
const droppable = true;
// Node Wrappers
export const NodeBenefitBgSectionContainer = withNode(
  BenefitBgSectionContainer,
  { draggable, droppable }
);

(NodeBenefitBgSectionContainer as any).craft = {
  ...(NodeBenefitBgSectionContainer as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeBenefitBgSectionTitle = withNode(BenefitBgSectionTitle, {
  draggable,
  // droppable,
});

(NodeBenefitBgSectionTitle as any).craft = {
  ...(NodeBenefitBgSectionTitle as any).craft,
  props: { number: 1, children: "제목입력" },
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeBgSectionContent = withNode(BgSectionContent, {
  droppable,
});

export const NodeBenefitBgSectionItem = withNode(BenefitBgSectionItem, {
  draggable,
  droppable,
});

(NodeBenefitBgSectionItem as any).craft = {
  ...(NodeBenefitBgSectionItem as any).craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeBenefitBgSection = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <NodeBenefitBgSectionContainer {...props}>
      <Element
        canvas
        id="title-container"
        is={NodeContainer as typeof NodeContainer & string}
        className={cn(
          "flex flex-row items-start gap-8 justify-center self-stretch"
        )}
      >
        <NodeText
          text="1"
          id="bg-section-number-1"
          className="text-white text-16 font-bold min-w-30 min-h-30 bg-black rounded-[8px] flex justify-center items-center"
          tagName="span"
        />
        <Element
          canvas
          id="title-subTitle-container"
          className={cn("flex flex-col gap-8")}
          is={NodeContainer as typeof NodeContainer & string}
        >
          <NodeText
            text="제목 입력"
            id="bg-section-title-1"
            className="whitespace-nowrap text-[22px] font-bold leading-[30px] text-[#2c2c2c]"
            tagName="h3"
          />
          <NodeText
            text="제목 입력"
            id="bg-section-title-1"
            className="whitespace-nowrap text-[16px] font-bold leading-[24px] text-[#586177]"
            tagName="span"
          />
        </Element>
      </Element>
    </NodeBenefitBgSectionContainer>
  );
};

(NodeBenefitBgSection as any).craft = {
  ...(NodeBenefitBgSection as any).craft,
  displayName: "BenefitBgSection",
  props: {},
  custom: {
    importPath: "@/components/ui/bg-section",
  },
  related: {
    toolbar: SettingsControl,
  },
};
