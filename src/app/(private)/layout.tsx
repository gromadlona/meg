import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Dashboard" },
  robots: { index: false, follow: false },
};

// TODO: tambahkan proteksi auth (middleware / check session + redirect ke /login).
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border p-4 sm:flex">
        <Link href="/dashboard" className="mb-6 font-semibold tracking-tight">
          Admin
        </Link>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/dashboard" className="rounded-md px-3 py-2 hover:bg-muted">
            Overview
          </Link>
          <Link
            href="/dashboard/posts"
            className="rounded-md px-3 py-2 hover:bg-muted"
          >
            Posts
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-md px-3 py-2 hover:bg-muted"
          >
            Settings
          </Link>
        </nav>
        <div className="mt-auto font-mono text-xs text-muted-foreground">
          (private) • noindex
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
