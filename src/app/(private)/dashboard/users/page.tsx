import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UsersManager } from "@/components/users-manager";

export const metadata: Metadata = {
  title: "Pengguna",
  description: "Kelola pengguna dashboard admin.",
  robots: { index: false, follow: false },
};

export default async function DashboardUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "admin") redirect("/dashboard");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pengguna</h1>
        <p className="text-sm text-muted-foreground">
          Tambah, ubah role, ban, dan hapus pengguna.
        </p>
      </div>
      <UsersManager currentUserId={session!.user.id} />
    </div>
  );
}
