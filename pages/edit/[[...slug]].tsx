// pages/edit/[[...slug]].tsx
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Viewport } from "@/components/viewport";
import { RenderNode } from "@/components/render-node";
import { CopyPasteHelper } from "@/hooks/CopyPasteHelper";
import { ComponentsMap } from "@/components/registry/ComponentsMap";
import { NodeContainer } from "@/components/node/container";
import { NodeText } from "@/components/node/Text";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type Props = {
  slug?: string;
  json?: string;
};

export default function EditPage({ slug, json }: Props) {
  console.log(json);
  return (
    <Editor resolver={ComponentsMap} onRender={RenderNode}>
      <Viewport>
        {/* 내부에서 초기화 수행 */}

        {!slug ? (
          <Frame>
            <Element
              canvas
              is={NodeContainer as typeof NodeContainer & string}
              custom={{ displayName: "App" }}
            >
              <NodeText text="새 페이지를 시작해보세요!" />
            </Element>
          </Frame>
        ) : (
          <>
            <EditorInitializer slug={slug} json={json} />
            <Frame></Frame>
          </>
        )}
      </Viewport>
      <CopyPasteHelper />
    </Editor>
  );
}

function EditorInitializer({ slug, json }: { slug?: string; json?: string }) {
  const { actions } = useEditor();

  useEffect(() => {
    if (slug && json) {
      try {
        actions.deserialize(JSON.parse(json));
      } catch (err) {
        console.error("deserialize 실패:", err);
      }
    }
  }, [slug, json]);

  return null; // UI 요소는 렌더링하지 않음
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slugParam = ctx.params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) return { props: {} };

  const res = await fetch(
    `https://raw.githubusercontent.com/OhSeungWan/rentre-fae-data/main/data/${slug}.json`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const text = await res.text();

  return {
    props: {
      slug,
      json: text,
    },
  };
};
