import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function DashboardPostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Placeholder manajemen tulisan.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-foreground px-4 py-2 text-sm text-background opacity-50"
          title="Aktif setelah ada DB + auth"
        >
          + New Post
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0"
          >
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="font-mono text-xs text-muted-foreground">
                /blog/{post.slug}
              </p>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
