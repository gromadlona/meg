import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export const metadata: Metadata = {
  title: { absolute: "Dashboard" },
  robots: { index: false, follow: false },
};

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

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
        <div className="mt-auto space-y-2">
          <p className="truncate px-3 text-xs text-muted-foreground">
            {session.user.email}
          </p>
          <LogoutButton />
          <div className="font-mono text-xs text-muted-foreground">
            (private) • noindex
          </div>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
