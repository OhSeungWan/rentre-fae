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
  NodeArticleTitleMain,
  NodeArticleTitleSub,
  NodeArticleTitleText,
} from "@/components/node/article-title";
import {
  NodeBenefitBgSection,
  NodeBenefitBgSectionContainer,
  NodeBenefitBgSectionItem,
  NodeBenefitBgSectionTitle,
  NodeBgSectionContent,
} from "@/components/node/bg-section";
import { NodeText } from "@/components/node/Text";
import { NodeStoryList } from "@/components/node/story-list";
import { NodeStoryItem } from "@/components/node/story-item";
import { NodeComparisonTable } from "@/components/node/comparison-table";
import { NodeContainer } from "@/components/node/container";
import { NodeImage } from "@/components/node/image";
import {
  NodeImportantTitle,
  NodeImportantTitleContainer,
  NodeImportantTitleText,
} from "@/components/node/important-title";
import { EditorHotkeys } from "@/components/editor-hotkeys";

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
          NodeArticleTitleMain,
          NodeArticleTitleSub,
          NodeArticleTitleText,
          NodeBenefitBgSectionContainer,
          NodeBenefitBgSectionItem,
          NodeBenefitBgSection,
          NodeBenefitBgSectionTitle,
          NodeBgSectionContent,
          NodeText,
          NodeStoryList,
          NodeStoryItem,
          NodeComparisonTable,
          NodeContainer,
          NodeImage,
          NodeImportantTitle,
          NodeImportantTitleText,
          NodeImportantTitleContainer,
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
        <EditorHotkeys />
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
                </Element>
              </Frame>
            </ReactIframe>
          </Viewport>

          <ControlPanel />
        </div>
      </Editor>
    </section>
  );
}
