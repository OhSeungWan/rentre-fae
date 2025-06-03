import { withNode } from "@/components/node/connector";
import { SettingsControl } from "@/components/settings-control";

import {
  BenefitBgSectionContainer,
  BenefitBgSectionItem,
  BenefitBgSectionTitle,
  BgSectionContent,
} from "../ui/bg-section";
import { Element } from "@craftjs/core";
const draggable = true;
const droppable = true;
// Node Wrappers
export const NodeBenefitBgSectionContainer = withNode(
  BenefitBgSectionContainer,
  { draggable, droppable }
);

export const NodeBenefitBgSectionTitle = withNode(BenefitBgSectionTitle, {
  draggable,
  droppable,
});

NodeBenefitBgSectionTitle.craft = {
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
NodeBenefitBgSectionItem.craft = {
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
        id="bg-section-title"
        is={
          NodeBenefitBgSectionTitle as typeof NodeBenefitBgSectionTitle & string
        }
      >
        제목입력
      </Element>
      <Element
        canvas
        id="bg-section-content"
        className="flex justify-center items-center w-full"
        is={NodeBgSectionContent as typeof NodeBgSectionContent & string}
      >
        <Element
          canvas
          id="bg-section-content"
          is={NodeBgSectionContent as typeof NodeBgSectionContent & string}
        ></Element>
        <Element
          canvas
          id="bg-section-content"
          is={NodeBgSectionContent as typeof NodeBgSectionContent & string}
        ></Element>
      </Element>
    </NodeBenefitBgSectionContainer>
  );
};

NodeBenefitBgSection.craft = {
  displayName: "BenefitBgSection",
  props: {},
  custom: {
    importPath: "@/components/BenefitBgSection",
  },
  related: {
    toolbar: SettingsControl,
  },
};
