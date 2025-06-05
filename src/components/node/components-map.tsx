import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { OneBlock, NodeOneBlock, NodeTwoBlocks } from "./layout";
import { NodeButton } from "./button";
import { NodeCard } from "./card";
import { Element } from "@craftjs/core";
import { NodeArticleTitle } from "./article-title";
import {
  ArticleTitleContainer,
  ArticleTitleDivider,
  ArticleTitleHeader,
  ArticleTitleMain,
  ArticleTitleSub,
  ArticleTitleText,
} from "../ui/article-title";
import { NodeBenefitBgSection } from "./bg-section";
import { NodeText } from "./Text";
import { NodeStoryItem } from "./story-item";
import { NodeStoryList } from "./story-list";
import { NodeComparisonTable } from "./comparison-table";
import { BenefitBgSectionContainer } from "../ui/bg-section";
import { Container } from "../ui/container";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";
import { AutoHeightImage } from "../ui/image";
import { NodeImage } from "./image";

export type Components = {
  name: string;
  items: {
    name: string;
    props?: {
      variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
      className?: string;
      children?: ReactNode | string;
    };
    node: ReactElement;
    demo?: ReactNode;
  }[];
};

export const componentsMap: Components[] = [
  {
    name: "Layout",
    items: [
      {
        name: "One Block",
        demo: (
          <OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
            One Block
          </OneBlock>
        ),
        node: (
          <Element
            canvas
            is={NodeOneBlock as typeof NodeOneBlock & string}
            id="one-block"
          />
        ),
      },
      {
        name: "Two Blocks",
        demo: (
          <OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex flex-row">
            <OneBlock className="text-center w-full italic bg-yellow-100 outline-dashed outline-amber-400">
              First Block
            </OneBlock>
            <OneBlock className="text-center w-full italic bg-yellow-100 outline-dashed outline-amber-400">
              Second Block
            </OneBlock>
          </OneBlock>
        ),
        node: <NodeTwoBlocks></NodeTwoBlocks>,
      },
      {
        name: "Two Blocks",
        demo: (
          <OneBlock className="text-center flex-col italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex ">
            <OneBlock className="text-center w-full italic bg-yellow-100 outline-dashed outline-amber-400">
              First Block
            </OneBlock>
            <OneBlock className="text-center w-full italic bg-yellow-100 outline-dashed outline-amber-400">
              Second Block
            </OneBlock>
          </OneBlock>
        ),
        node: <NodeTwoBlocks></NodeTwoBlocks>,
      },
    ],
  },
  {
    name: "Text",
    items: [
      {
        name: "ArticleTitle",
        demo: (
          <ArticleTitleContainer>
            <ArticleTitleHeader>
              <ArticleTitleMain>Title</ArticleTitleMain>
              <ArticleTitleSub>SubTitle</ArticleTitleSub>
              <ArticleTitleText>SubText</ArticleTitleText>
            </ArticleTitleHeader>

            <ArticleTitleDivider />
          </ArticleTitleContainer>
        ),
        node: <NodeArticleTitle id="article-title" />,
        props: {},
      },
      {
        name: "BenefitBgSection",
        demo: (
          <BenefitBgSectionContainer>
            <Container
              className={cn(
                "flex flex-row items-start gap-8 justify-center self-stretch"
              )}
            >
              <Text
                text="1"
                className="text-white text-16 font-bold min-w-30 min-h-30 bg-black rounded-[8px] flex justify-center items-center"
                tagName="span"
              />
              <Container className={cn("flex flex-col gap-8")}>
                <Text
                  text="제목 입력"
                  className="whitespace-nowrap text-[22px] font-bold leading-[30px] text-[#2c2c2c]"
                  tagName="h3"
                />
                <Text
                  text="제목 입력"
                  className="whitespace-nowrap text-[16px] font-bold leading-[24px] text-[#586177]"
                  tagName="span"
                />
              </Container>
            </Container>
          </BenefitBgSectionContainer>
        ),
        node: <NodeBenefitBgSection id="benefit-bg-section" />,
        props: {},
      },
      {
        name: "Text",
        demo: <Text text="텍스트 입력하기 " />,
        node: <NodeText text="텍스트" />,
      },
      {
        name: "Image",
        demo: <AutoHeightImage src="/hero.png" alt="sample" />,
        node: <NodeImage src="/hero.png" alt="sample" />,
      },
    ],
  },

  {
    name: "Buttons",
    items: [
      {
        name: "Default",
        demo: <Button>Default</Button>,
        node: <NodeButton>Default</NodeButton>,
      },
      {
        name: "Outline",
        props: { variant: "outline", children: "Outline" },
        demo: <Button variant={"outline"}>Outline</Button>,
        node: <NodeButton variant={"outline"}>Outline</NodeButton>,
      },
      {
        name: "Destructive",
        props: { variant: "destructive", children: "Destructive" },
        demo: <Button variant={"destructive"}>Destructive</Button>,
        node: <NodeButton variant={"destructive"}>Destructive</NodeButton>,
      },
    ],
  },
  {
    name: "Cards",
    items: [
      {
        name: "Default",
        demo: (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>Empty Container</CardContent>
            <CardFooter>
              <Button className="w-full">Footer button</Button>
            </CardFooter>
          </Card>
        ),
        node: <NodeCard></NodeCard>,
      },
      {
        name: "StoryItem",
        node: (
          <NodeStoryItem
            imgSrc="/hero.png"
            title="Title"
            subTitle="Sub"
            linkUrl="/"
          />
        ),
      },
    ],
  },
  // {
  //   name: "Tables",
  //   items: [
  //     {
  //       name: "ComparisonTable",
  //       node: <NodeComparisonTable id="comparison-table" />,
  //     },
  //   ],
  // },
  // {
  //   name: "Stories",
  //   items: [
  //     // {
  //     //   name: "StoryItem",
  //     //   node: (
  //     //     <NodeStoryItem
  //     //       imgSrc="/hero.png"
  //     //       title="Title"
  //     //       subTitle="Sub"
  //     //       linkUrl="/"
  //     //     />
  //     //   ),
  //     // },
  //     // {
  //     //   name: "StoryList",
  //     //   node: <NodeStoryList id="story-list" />,
  //     // },
  //   ],
  // },
];
