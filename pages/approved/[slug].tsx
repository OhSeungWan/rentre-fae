import {
  Editor,
  Frame,
  Element,
  DefaultEventHandlers,
  useEditor,
} from "@craftjs/core";
import { SideMenu } from "@/components/side-menu";
import { Header } from "@/components/header";
import { Canvas } from "@/components/canvas";
import { ReactIframe } from "@/components/react-iframe";
import { ControlPanel } from "@/components/control-panel";
import { Viewport } from "@/components/viewport";
import { RenderNode } from "@/components/render-node";
import { componentsMap } from "@/components/node/components-map";
import { NodeButton } from "@/components/node/button";
import {
  NodeCardHeader,
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardTitle,
  NodeCardFooter,
} from "@/components/node/card";
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
import { CopyPasteHelper } from "@/hooks/CopyPasteHelper";
import { GetServerSideProps } from "next";
import { parseTsx } from "@/lib/parseTsx";
import { useEffect } from "react";

interface Props {
  slug: string;
  json: string;
}

export default function EditApprovedPage({ slug, json }: Props) {
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
        <div className="flex flex-1 relative overflow-hidden">
          <SideMenu componentsMap={componentsMap} />
          <Viewport>
            <ReactIframe
              title="page"
              className="p-64 w-full h-full page-container"
            >
              <EditorInitializer slug={slug} json={json} />
              <Frame>
                <Element is={Canvas} id="ROOT" canvas>
                  {null}
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

function EditorInitializer({ slug, json }: { slug: string; json: string }) {
  const { actions } = useEditor();

  useEffect(() => {
    try {
      actions.deserialize(JSON.parse(json));
    } catch (err) {
      console.error("deserialize 실패:", err);
    }
  }, [slug, json]);

  return null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug;
  if (typeof slug !== "string") return { notFound: true };

  const res = await fetch(
    `https://raw.githubusercontent.com/OhSeungWan/rentre-fae-data/main/data/${slug}.tsx`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const tsx = await res.text();
  console.log(tsx);
  const json = parseTsx(tsx);

  return {
    props: { slug, json },
  };
};
