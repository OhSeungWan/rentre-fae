// pages/edit/[[...slug]].tsx
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { RenderNode, Viewport } from "components/editor";
import { ComponentsMap } from "components/registry/ComponentsMap";
import { Container, Text } from "components/selectors";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type Props = {
  slug?: string;
  json?: string;
};

export default function EditPage({ slug, json }: Props) {
  const { actions } = useEditor();

  useEffect(() => {
    if (slug && json) {
      try {
        actions.deserialize(json);
      } catch (err) {
        console.error("❌ 상태 복원 실패:", err);
      }
    }
  }, [slug, json]);

  return (
    <Editor enabled={true} resolver={ComponentsMap} onRender={RenderNode}>
      <Viewport>
        {/* 새 페이지 모드: 빈 Frame */}
        {!slug && (
          <Frame>
            <Element
              canvas
              is={Container}
              width="600px"
              height="auto"
              background={{ r: 255, g: 255, b: 255, a: 1 }}
              padding={["0", "0", "0", "0"]}
              alignItems="center"
              custom={{ displayName: "App" }}
            >
              <Text text="새 페이지를 시작해보세요!" />
            </Element>
          </Frame>
        )}
      </Viewport>
    </Editor>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slugParam = ctx.params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) return { props: {} };

  const res = await fetch(
    `https://raw.githubusercontent.com/OhSeungWan/rentre-fae-data/main/rejected/${slug}.json`,
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
