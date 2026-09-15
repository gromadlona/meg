import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureBento } from "@/components/landing/feature-bento";
import { Hero } from "@/components/landing/hero";
import { TechMarquee } from "@/components/landing/tech-marquee";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "MeGGi.dev — Portfolio & Blog",
  description:
    "MeGGi.dev — portfolio & blog pribadi: project pilihan, tulisan seputar Next.js & SSR, dan eksperimen web modern yang cepat dan SEO-friendly.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MeGGi.dev",
  url: siteConfig.url,
  description: siteConfig.description,
  author: { "@type": "Person", name: siteConfig.author },
};

export default async function HomePage() {
  // SSR: data diambil di server — HTML sudah jadi saat dibuka & di-crawl.
  const posts = await getPosts();
  const latest = posts.slice(0, 3);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 py-16 sm:space-y-20 sm:px-6 sm:py-20 lg:px-8">
      <TechMarquee />
      <FeatureBento />

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Terbaru dari blog
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tulisan terkini
            </h2>
          </div>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}
          >
            Semua tulisan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col transition-colors hover:border-foreground/20"
            >
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full font-mono text-xs">
                    {post.date}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">
                    {post.readingMinutes} min read
                  </span>
                </div>
                <CardTitle className="leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto border-t-0 bg-transparent pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Baca selengkapnya
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <Meteors number={24} />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-none -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative space-y-5">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Mari terhubung
          </p>
          <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight sm:text-4xl">
            Punya ide project atau sekadar mau say hi?
          </h2>
          <p className="mx-auto max-w-md text-zinc-400">
            Inbox saya selalu terbuka untuk kolaborasi, freelance, atau
            diskusi seputar web development.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link href="/contact" aria-label="Hubungi saya">
              <ShimmerButton className="px-7 py-3 text-sm font-medium">
                Hubungi Saya
                <ArrowRight className="ml-2 h-4 w-4" />
              </ShimmerButton>
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Tentang Saya
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
