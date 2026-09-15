import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
