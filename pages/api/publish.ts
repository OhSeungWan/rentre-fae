// pages/api/publish.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { getOutputCode } from "@/lib/code-gen";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const REPO_OWNER = "OhSeungWan";
const REPO_NAME = "rentre-fae-data";
const FILE_DIR = "data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug, data } = req.body;

  if (!slug || !data) {
    return res.status(400).json({ error: "Missing slug or data" });
  }

  const branchName = `feature/page/${slug}`;
  const filePath = `${FILE_DIR}/${slug}.tsx`;

  const nodes = typeof data === "string" ? JSON.parse(data) : data;
  const { importString, output } = getOutputCode(nodes);
  const tsContent = `${importString}\n\n${output}\n`;
  const content = Buffer.from(tsContent).toString("base64");

  try {
    // 1. Get the SHA of the main branch
    const { data: baseRef } = await octokit.rest.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: "heads/main",
    });

    const baseSha = baseRef.object.sha;

    // 2. Create a new branch from main if it doesn't already exist
    try {
      await octokit.rest.git.createRef({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      });
    } catch (err: any) {
      // Branch already exists
      if (err.status !== 422) throw err;
    }

    // 3. Create or update file in the new branch
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Add/update page: ${slug}`,
      content,
      branch: branchName,
    });

    // 4. Create a pull request to main
    const { data: pr } = await octokit.rest.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `New Page Proposal: ${slug}`,
      head: branchName,
      base: "main",
      body: `자동 생성된 페이지입니다. 슬러그: \`${slug}\``,
    });

    res.status(200).json({
      message: "PR created successfully",
      prUrl: pr.html_url,
    });
  } catch (error: any) {
    console.error("Publish error:", error);
    res.status(500).json({ error: error.message });
  }
}
