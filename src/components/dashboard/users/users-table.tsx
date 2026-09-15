import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRowActions } from "@/components/dashboard/users/user-row-actions";
import { roleLabel, type AdminUser } from "@/components/dashboard/users/types";
import { UsersIcon } from "lucide-react";

export function UsersTable({
  users,
  total,
  query,
  currentUserId,
}: {
  users: AdminUser[];
  total: number;
  query: string;
  currentUserId: string;
}) {
  if (users.length === 0) {
    return (
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon />
              </EmptyMedia>
              <EmptyTitle>Belum ada pengguna</EmptyTitle>
              <EmptyDescription>
                {query
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
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
                      roleLabel(user.role) === "admin" ? "default" : "secondary"
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
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mt-4 text-xs text-muted-foreground">
          Total: {total} pengguna
        </p>
      </CardContent>
    </Card>
  );
}
