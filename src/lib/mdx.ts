import fs from "fs";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import type { MDXComponents } from "mdx/types";
import type { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import * as jsxRuntime from "react/jsx-runtime";

export type MDXContent = (props: {
  components?: MDXComponents;
}) => JSX.Element;

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

// Kompilasi MDX saat render di Server Component (Node runtime).
// Dipilih karena @next/mdx webpack-loader tidak kompatibel dengan Turbopack:
// opsi plugin fungsi tidak serializable ke Rust
// ("Using Plugins with Turbopack", mdx.md), dan mode string gagal resolve.
// evaluate() jalan di Node biasa → plugin fungsi bebas dipakai.
export async function getMdxContent(slug: string): Promise<MDXContent> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { content } = matter(raw); // buang frontmatter (metadata di posts.ts)
  const { default: Content } = (await evaluate(content, {
    ...jsxRuntime,
    rehypePlugins: [
      // id unik per heading — fondasi anchor + TOC.
      rehypeSlug,
      // Highlight blok kode via Shiki (light + dark).
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  })) as unknown as { default: MDXContent };
  return Content;
}
