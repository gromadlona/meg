import { getPosts } from "@/lib/posts";

export default async function DashboardPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Placeholder admin — ringkasan konten.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border p-5">
          <p className="font-mono text-xs text-muted-foreground">Total posts</p>
          <p className="mt-1 text-2xl font-semibold">{posts.length}</p>
        </div>
        <div className="rounded-xl border border-border p-5">
          <p className="font-mono text-xs text-muted-foreground">Draft</p>
          <p className="mt-1 text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-xl border border-border p-5">
          <p className="font-mono text-xs text-muted-foreground">Views (dummy)</p>
          <p className="mt-1 text-2xl font-semibold">—</p>
        </div>
      </div>
    </div>
  );
}
