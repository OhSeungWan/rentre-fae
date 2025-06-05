import Link from "next/link";
import type { GetServerSideProps } from "next";

type Props = {
  pages: {
    slug: string;
    updatedAt: string;
  }[];
};

export default function Approved({ pages }: Props) {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "1rem" }}>
        ✅ 승인된 페이지 목록
      </h1>

      <div style={{ display: "grid", gap: "1rem" }}>
        {pages.map(({ slug, updatedAt }) => (
          <Link
            key={slug}
            href={`/approved/${slug}`}
            style={{
              display: "block",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 600 }}>{slug}</div>
            <div style={{ fontSize: "14px", color: "#888" }}>
              최근 수정: {new Date(updatedAt).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(
    "https://api.github.com/repos/OhSeungWan/rentre-fae-data/contents/data?ref=main",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const raw = await res.json();

  // ✅ 승인된 페이지만 필터링 + updatedAt 추출
  const pages: Props["pages"] = [];

  for (const item of raw) {
    if (!item.name.endsWith(".json")) continue;

    const file = JSON.parse(
      await fetch(item.download_url).then((r) => r.json())
    );

    const status = file?.ROOT?.custom?.status;
    const updatedAt = file?.ROOT?.custom?.updatedAt;

    if (status === "approved") {
      pages.push({
        slug: item.name.replace(".json", ""),
        updatedAt: updatedAt ?? new Date().toISOString(),
      });
    }
  }

  // const pages = raw
  //   .filter((item: any) => item.name.endsWith(".json"))
  //   .map((item: any) => ({
  //     slug: item.name.replace(".json", ""),
  //     updatedAt: item.git_url ? item.git_url : item.sha, // fallback
  //   }));

  return {
    props: { pages },
  };
};
