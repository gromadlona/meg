import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

function slugsFromDisk(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export async function getPosts(): Promise<Post[]> {
  return slugsFromDisk()
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (!slugsFromDisk().includes(slug)) return undefined;
  return readPost(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  return slugsFromDisk();
}
