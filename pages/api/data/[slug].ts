import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (typeof slug !== "string") return res.status(400).send("Invalid slug");

  try {
    const file = await octokit.rest.repos.getContent({
      owner: "OhSeungWan",
      repo: "rentre-fae-data",
      path: `data/${slug}.json`,
    });

    const content = Buffer.from((file.data as any).content, "base64").toString(
      "utf-8"
    );

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(content);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "데이터를 불러올 수 없습니다." });
  }
}
