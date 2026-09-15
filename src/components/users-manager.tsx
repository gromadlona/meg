"use client";

import * as React from "react";
import { useDebounce } from "use-debounce";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserFormDialog } from "@/components/user-form-dialog";
import { UserRowActions } from "@/components/user-row-actions";
import { CircleAlertIcon, SearchIcon, UserPlusIcon, UsersIcon } from "lucide-react";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string | null;
  banned?: boolean | null;
  createdAt: Date | string;
};

function roleLabel(role?: string | null) {
  return role ?? "user";
}

export function UsersManager({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search.trim(), 400);
  const firstLoad = React.useRef(true);

  async function fetchUsers(query: string) {
    const { data, error } = await authClient.admin.listUsers({
      query: query
        ? {
            searchValue: query,
            searchField: "email",
            searchOperator: "contains",
            limit: 100,
          }
        : { limit: 100 },
    });
    return { data, error };
  }

  const applyResult = React.useCallback(
    (result: Awaited<ReturnType<typeof fetchUsers>>) => {
      const { data, error } = result;
      if (error) {
        setUsers([]);
        setTotal(0);
        setError("Gagal memuat daftar pengguna.");
      } else {
        setError(null);
        setUsers((data?.users ?? []) as AdminUser[]);
        setTotal(data?.total ?? 0);
      }
      setLoading(false);
      setRefreshing(false);
      firstLoad.current = false;
    },
    [],
  );

  React.useEffect(() => {
    let cancelled = false;
    if (!firstLoad.current) setRefreshing(true);
    void fetchUsers(debouncedSearch).then((result) => {
      if (!cancelled) applyResult(result);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, applyResult]);

  async function load() {
    setRefreshing(true);
    applyResult(await fetchUsers(debouncedSearch));
  }

  async function onAction(
    label: string,
    fn: () => Promise<{ error: unknown } | unknown>,
  ) {
    const { error } = (await fn()) as { error: { message?: string } | null };
    if (error) {
      toast.add({
        type: "error",
        title: `${label} gagal`,
        description: error.message ?? "Terjadi kesalahan.",
      });
      return;
    }
    toast.add({ type: "success", title: `${label} berhasil` });
    await load();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari email…"
            autoComplete="off"
            className="pl-8"
            aria-label="Cari pengguna"
          />
        </div>
        <UserFormDialog
          trigger={
            <Button>
              <UserPlusIcon data-icon="inline-start" />
              Tambah Pengguna
            </Button>
          }
          onSaved={load}
        />
      </div>

      {error ? (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>Gagal memuat</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardContent>
          {loading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UsersIcon />
                </EmptyMedia>
                <EmptyTitle>Belum ada pengguna</EmptyTitle>
                <EmptyDescription>
                  {debouncedSearch
                    ? "Tidak cocok dengan pencarian."
                    : "Tambah pengguna pertama via tombol di atas."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-xs text-muted-foreground">
                  Total: {total} pengguna
                </p>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="flex flex-col gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                        {user.id === currentUserId ? (
                          <Badge variant="outline" className="ml-2">
                            kamu
                          </Badge>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            roleLabel(user.role) === "admin"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {roleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.banned ? (
                          <Badge variant="destructive">banned</Badge>
                        ) : (
                          <Badge variant="outline">aktif</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <UserRowActions
                          user={user}
                          isSelf={user.id === currentUserId}
                          onAction={onAction}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {refreshing ? (
                <div
                  role="status"
                  aria-label="Memuat ulang daftar"
                  className="flex flex-col gap-2"
                >
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
