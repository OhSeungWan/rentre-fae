import { Editor, Frame, Element } from "@craftjs/core";
import { DefaultEventHandlers } from "@craftjs/core";
import { SideMenu } from "@/components/side-menu";
import { Header } from "@/components/header";
import { Canvas } from "@/components/canvas";
import { NodeButton } from "@/components/node/button";
import {
  NodeCardHeader,
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardTitle,
  NodeCardFooter,
} from "@/components/node/card";
import { ReactIframe } from "@/components/react-iframe";
import { ControlPanel } from "@/components/control-panel";
import { Viewport } from "@/components/viewport";
import { RenderNode } from "@/components/render-node";
import { componentsMap } from "@/components/node/components-map";
import { NodeOneBlock, NodeTwoBlocks } from "@/components/node/layout";
import {
  NodeArticleTitle,
  NodeArticleTitleContainer,
  NodeArticleTitleDivider,
  NodeArticleTitleHeader,
} from "@/components/node/article-title";
import { NodeBenefitBgSection } from "@/components/node/bg-section";
import { NodeText } from "@/components/node/Text";
import { NodeStoryList } from "@/components/node/story-list";
import { NodeStoryItem } from "@/components/node/story-item";
import { NodeComparisonTable } from "@/components/node/comparison-table";
import { NodeContainer } from "@/components/node/container";
import { NodeImage } from "@/components/node/image";

import { CopyPasteHelper } from "@/hooks/CopyPasteHelper";

import {
  NodeImportantTitle,
  NodeImportantTitleText,
} from "@/components/node/important-title";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />
      <Editor
        resolver={{
          NodeButton,
          Canvas,
          NodeCardHeader,
          NodeCard,
          NodeCardContent,
          NodeCardDescription,
          NodeCardTitle,
          NodeCardFooter,
          NodeOneBlock,
          NodeTwoBlocks,
          NodeArticleTitle,
          NodeArticleTitleContainer,
          NodeArticleTitleDivider,
          NodeArticleTitleHeader,

          NodeText,
          NodeStoryList,
          NodeStoryItem,
          NodeComparisonTable,
          NodeContainer,
          NodeImage,
          NodeImportantTitle,
          NodeImportantTitleText,

          NodeBenefitBgSection,
        }}
        onRender={RenderNode}
        handlers={(store) =>
          new DefaultEventHandlers({
            store,
            isMultiSelectEnabled: (e: MouseEvent) => e.shiftKey || e.metaKey,
            removeHoverOnMouseleave: true,
          })
        }
      >
        <div className="flex flex-1 relative overflow-hidden">
          <SideMenu componentsMap={componentsMap} />
          <Viewport>
            <ReactIframe
              title="my frame"
              className="p-64 w-full h-full page-container"
            >
              <Frame>
                <Element is={Canvas} id="ROOT" canvas>
                  <NodeImage src="/hero.png" alt="hero"></NodeImage>
                  <NodeArticleTitle></NodeArticleTitle>
                  <NodeBenefitBgSection></NodeBenefitBgSection>
                  <NodeContainer
                    className={cn(
                      "flex flex-col gap-8 px-48 py-48 bg-[#F9FAFB] w-full items-center"
                    )}
                  >
                    <NodeText
                      text="제목"
                      className="text-[22px] font-bold leading-[30px] text-[#2c2c2c]"
                      tagName="h3"
                    />
                    <NodeContainer
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
                        className="w-full text-[#586177] text-16 font-bold leading-[24px]"
                      />
                    </NodeContainer>
                    <NodeContainer
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
                        className="w-full text-[#586177] text-16 font-bold leading-[24px]"
                      />
                    </NodeContainer>
                  </NodeContainer>
                  <NodeTwoBlocks />
                </Element>
              </Frame>
            </ReactIframe>
          </Viewport>

          <ControlPanel />
        </div>
        <CopyPasteHelper />
      </Editor>
    </section>
  );
}
