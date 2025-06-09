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
import { NodeArticleTitle, NodeArticleTitleHeader } from "./article-title";
import {
  ArticleTitle,
  ArticleTitleDivider,
  ArticleTitleHeader,
} from "../ui/article-title";
import { NodeBenefitBgSection } from "./bg-section";
import { NodeText } from "./Text";
import { NodeStoryItem } from "./story-item";

import { Container } from "../ui/container";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";
import { AutoHeightImage } from "../ui/image";
import { NodeImage } from "./image";
import { NodeImportantTitle } from "./important-title";
import { NodeContainer } from "./container";
import { BenefitBgSection } from "../ui/bg-section";

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
    name: "Items",
    items: [
      {
        name: "ArticleTitle",
        demo: (
          <ArticleTitle>
            <ArticleTitleHeader>
              <Text
                className={cn(
                  "self-stretch whitespace-pre-line text-center text-[32px] font-bold leading-[38px] text-[#2c2c2c]"
                )}
                tagName="h1"
                text="제목"
              />

              <Text
                className={cn(
                  "text-[#2c2c2c] w-full whitespace-pre-line break-keep text-center leading-[28px] tracking-[-0.01em]"
                )}
                tagName="h3"
                text="부제목"
              />
              <Text
                className={cn(
                  "w-full whitespace-pre-line break-keep text-center text-[18px] leading-[24px] text-[#2c2c2c]"
                )}
                tagName="p"
                text="내용"
              />
            </ArticleTitleHeader>
            <ArticleTitleDivider />
          </ArticleTitle>
        ),
        node: <NodeArticleTitle id="article-title" />,
        props: {},
      },
      {
        name: "BenefitBgSection",
        demo: (
          <BenefitBgSection>
            <Container
              className={cn(
                "flex flex-row items-start gap-8 justify-center self-stretch"
              )}
            >
              <Text
                disabled
                text="1"
                className="text-white text-16 font-bold min-w-30 min-h-30 bg-black rounded-[8px] flex justify-center items-center"
                tagName="span"
              />
              <Container className={cn("flex flex-col gap-8")}>
                <Text
                  disabled
                  text="제목 입력"
                  className="whitespace-nowrap text-[22px] font-bold leading-[30px] text-[#2c2c2c]"
                  tagName="h3"
                />
                <Text
                  disabled
                  text="제목 입력"
                  className="whitespace-nowrap text-[16px] font-bold leading-[24px] text-[#586177]"
                  tagName="span"
                />
              </Container>
            </Container>
          </BenefitBgSection>
        ),
        node: <NodeBenefitBgSection />,
        props: {},
      },
      {
        name: "Text",
        demo: <Text text="텍스트 입력하기 " disabled />,
        node: <NodeText text="텍스트" />,
      },
      {
        name: "Image",
        demo: <AutoHeightImage src="/hero.png" alt="sample" />,
        node: <NodeImage src="/hero.png" alt="sample" />,
      },
      {
        name: "BenefitBgSection",
        demo: (
          <Container
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
            <Text
              text="제목입력"
              disabled
              className="w-full text-[#586177] text-16 font-bold leading-[24px]"
            />
          </Container>
        ),
        node: <NodeImportantTitle />,
        props: {},
      },
      {
        name: "BenefitBgSection List",
        demo: (
          <Container
            className={cn(
              "flex flex-col gap-8 px-48 py-48 bg-[#F9FAFB] w-full items-center"
            )}
          >
            <Text
              text="제목"
              disabled
              className="text-[22px] font-bold leading-[30px] text-[#2c2c2c]"
              tagName="h3"
            />
            <Container
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
              <Text
                disabled
                text="제목입력"
                className="w-full text-[#586177] text-16 font-bold leading-[24px]"
              />
            </Container>
            <Container
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
              <Text
                disabled
                text="제목입력"
                className="w-full text-[#586177] text-16 font-bold leading-[24px]"
              />
            </Container>
          </Container>
        ),
        node: (
          <NodeContainer className="flex flex-col items-center gap-20 w-full px-48 py-48 bg-[#F9FAFB]">
            <NodeText
              id="imp-title-list-title"
              text="제목"
              className="text-[22px] text-center font-bold leading-[30px] text-[#2c2c2c]"
              tagName="h3"
            />
            <Element
              canvas
              is={NodeContainer as typeof NodeContainer & string}
              id="imp-title-list-container"
              className="w-full flex flex-col gap-12"
            >
              <Element
                canvas
                id="imp-title-list-container-1"
                is={NodeImportantTitle as typeof NodeImportantTitle & string}
              />
              <Element
                canvas
                id="imp-title-list-container-2"
                is={NodeImportantTitle as typeof NodeImportantTitle & string}
              />
            </Element>
          </NodeContainer>
        ),
        props: {},
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
  //       node: (
  //         <NodeComparisonTable
  //           id="comparison-table"
  //           columnCount={3}
  //           rowCount={3}
  //         />
  //       ),
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
