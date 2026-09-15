import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserPlusIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { UsersSearch } from "@/components/dashboard/users/users-search";
import { UsersTable } from "@/components/dashboard/users/users-table";
import type { AdminUser } from "@/components/dashboard/users/types";
import { CircleAlertIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Pengguna",
  description: "Kelola pengguna dashboard admin.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function DashboardUsersPage({ searchParams }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "admin") redirect("/dashboard");

  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let users: AdminUser[] = [];
  let total = 0;
  let loadError: string | null = null;

  try {
    const result = await auth.api.listUsers({
      query: query
        ? {
            searchValue: query,
            searchField: "email",
            searchOperator: "contains",
            limit: 100,
          }
        : { limit: 100 },
      headers: await headers(),
    });
    users = (result.users ?? []) as AdminUser[];
    total = result.total ?? 0;
  } catch {
    loadError = "Gagal memuat daftar pengguna.";
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pengguna</h1>
        <p className="text-sm text-muted-foreground">
          Tambah, ubah role, ban, dan hapus pengguna.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Suspense>
          <UsersSearch />
        </Suspense>
        <UserFormDialog
          trigger={
            <Button>
              <UserPlusIcon data-icon="inline-start" />
              Tambah Pengguna
            </Button>
          }
        />
      </div>

      {loadError ? (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>Gagal memuat</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      ) : (
        <UsersTable
          users={users}
          total={total}
          query={query}
          currentUserId={session!.user.id}
        />
      )}
    </div>
  );
}
