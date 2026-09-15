import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { getMdxContent } from "@/lib/mdx";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { useMDXComponents } from "@/mdx-components";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-render semua slug MDX saat build (SSG) — tetap SSR-friendly & SEO.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Slug di luar generateStaticParams langsung 404 di level routing
// (pola resmi "Using dynamic imports", docs/app/guides/mdx).
export const dynamicParams = false;

// Metadata dinamis per artikel → title & description unik di Google.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // MDX dikompilasi saat render (Node runtime) + Shiki. Lihat src/lib/mdx.ts.
  const Content = await getMdxContent(slug);
  const mdxComponents = useMDXComponents({});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.author },
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
        <article className="mx-auto w-full max-w-2xl space-y-6">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← Kembali ke blog
          </Link>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mdx-body space-y-5 border-t border-border pt-6">
            <Content components={mdxComponents} />
          </div>
        </article>
        <TableOfContents />
      </div>
    </div>
  );
}
