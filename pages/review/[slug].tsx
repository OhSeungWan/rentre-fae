// pages/review/[slug].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Editor, Frame, Element } from "@craftjs/core";

// 상태 복원용 renderer
import { ComponentsMap } from "components/registry/ComponentsMap";
import { CraftPreviewRenderer } from "components/review/CraftPreviewRenderer";
import Link from "next/link";

export default function ReviewPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [json, setJson] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || Array.isArray(slug)) return;

    fetch(`/api/data/${slug}`)
      .then((res) => res.text())
      .then(setJson)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [slug]);

  const handleApprove = async () => {
    alert(`"${slug}" 페이지 승인 완료!`);
    // TODO: 슬랙, Notion, 로깅 연동 가능
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!json) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📄 {slug} 페이지 리뷰</h1>

      <Link href="/approved" style={{ fontSize: "14px", color: "#666" }}>
        ← 승인된 목록으로 돌아가기
      </Link>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Editor enabled={false} resolver={{ ...ComponentsMap }}>
          <CraftPreviewRenderer json={json} />
          <Frame></Frame>
        </Editor>
      </div>
      <button
        onClick={handleApprove}
        style={{
          backgroundColor: "#00b894",
          color: "white",
          padding: "10px 16px",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "none",
        }}
      >
        ✅ 최종 승인
      </button>
    </div>
  );
}
