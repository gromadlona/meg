import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Kumpulan tulisan seputar Next.js, SSR, dan web development.",
  alternates: {
    types: { "application/rss+xml": `${siteConfig.url}/rss` },
  },
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          SSR • SEO-friendly
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="max-w-2xl text-muted-foreground">
          Halaman ini adalah Server Component — HTML-nya dirender di server
          sehingga cepat dan mudah di-index Google.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingMinutes} min read</span>
              <span>•</span>
              <span>{post.tags.join(", ")}</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-1 text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
