import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";

export async function GET(req: NextRequest) {
  const response = await fetch(
    "https://api.github.com/repos/hamtsu/combat-surf-web/contents/changelogs",
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch changelogs" },
      { status: response.status }
    );
  }

  const files = await response.json();

  let changelogs = await Promise.all(
    files
      .filter((file: any) => file.name.endsWith(".md"))
      .map(async (file: any) => {
        const fileRes = await fetch(file.download_url);
        const rawContent = await fileRes.text();

        const { data: metadata, content } = matter(rawContent); // using matter get metadata

        return { name: file.name, metadata, content };
      })
  );

  changelogs = changelogs.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return NextResponse.json(changelogs);
}
