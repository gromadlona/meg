"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  banUserAction,
  removeUserAction,
  setPasswordAction,
  setRoleAction,
  unbanUserAction,
  type ActionResult,
} from "@/components/dashboard/users/actions";
import { toast } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { AdminUser } from "@/components/dashboard/users/types";
import { KeyRoundIcon, ShieldCheckIcon, Trash2Icon, BanIcon } from "lucide-react";

const roleSchema = z.object({ role: z.enum(["admin", "user"]) });
const passwordSchema = z.object({
  newPassword: z.string().min(8, "Password minimal 8 karakter.").max(128),
});
const banSchema = z.object({
  banReason: z.string().max(200).optional(),
});

function ActionButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="ghost" size="sm" {...props}>
      {children}
    </Button>
  );
}

export function UserRowActions({
  user,
  isSelf,
}: {
  user: AdminUser;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState<string | null>(null);
  const [roleOpen, setRoleOpen] = React.useState(false);
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [banOpen, setBanOpen] = React.useState(false);

  const roleForm = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: { role: user.role === "admin" ? "admin" : "user" },
  });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: "" },
  });
  const banForm = useForm<z.infer<typeof banSchema>>({
    resolver: zodResolver(banSchema),
    defaultValues: { banReason: "" },
  });

  async function run(
    label: string,
    key: string,
    fn: () => Promise<ActionResult>,
  ): Promise<boolean> {
    setPending(key);
    try {
      const result = await fn();
      if (!result.ok) {
        toast.add({
          type: "error",
          title: `${label} gagal`,
          description: result.message,
        });
        return false;
      }
      toast.add({ type: "success", title: `${label} berhasil` });
      router.refresh();
      return true;
    } finally {
      setPending(null);
    }
  }

  const busy = pending !== null;

  return (
    <div className="flex items-center justify-end gap-1">
      <Dialog open={roleOpen} onOpenChange={setRoleOpen}>
        <DialogTrigger
          render={
            <ActionButton disabled={busy || isSelf} title="Ubah role" />
          }
        >
          <ShieldCheckIcon data-icon="inline-start" />
          Role
        </DialogTrigger>
        <DialogHeader className="sr-only">
          <DialogTitle>Ubah role {user.email}</DialogTitle>
          <DialogDescription>Pilih role baru.</DialogDescription>
        </DialogHeader>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Ubah role</DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <form
            id={`role-form-${user.id}`}
            onSubmit={roleForm.handleSubmit(async (values) => {
              const ok = await run("Ubah role", "role", () =>
                setRoleAction(user.id, values.role),
              );
              if (ok) setRoleOpen(false);
            })}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="role"
                control={roleForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`role-${user.id}`}>Role</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={`role-${user.id}`}
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRoleOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" form={`role-form-${user.id}`}>
              {pending === "role" ? (
                <>
                  <Spinner data-icon="inline-start" /> Menyimpan…
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogTrigger
          render={<ActionButton disabled={busy} title="Reset password" />}
        >
          <KeyRoundIcon data-icon="inline-start" />
          Password
        </DialogTrigger>
        <DialogHeader className="sr-only">
          <DialogTitle>Reset password {user.email}</DialogTitle>
          <DialogDescription>Masukkan password baru.</DialogDescription>
        </DialogHeader>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <form
            id={`password-form-${user.id}`}
            onSubmit={passwordForm.handleSubmit(async (values) => {
              const ok = await run("Reset password", "password", () =>
                setPasswordAction(user.id, values.newPassword),
              );
              if (ok) {
                passwordForm.reset();
                setPasswordOpen(false);
              }
            })}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="newPassword"
                control={passwordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`password-${user.id}`}>
                      Password baru
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`password-${user.id}`}
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPasswordOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" form={`password-form-${user.id}`}>
              {pending === "password" ? (
                <>
                  <Spinner data-icon="inline-start" /> Menyimpan…
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {user.banned ? (
        <ActionButton
          disabled={busy}
          title="Unban pengguna"
          onClick={() =>
            run("Unban pengguna", "ban", () => unbanUserAction(user.id))
          }
        >
          {pending === "ban" ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <BanIcon data-icon="inline-start" />
          )}
          Unban
        </ActionButton>
      ) : (
        <Dialog open={banOpen} onOpenChange={setBanOpen}>
          <DialogTrigger
            render={
              <ActionButton disabled={busy || isSelf} title="Ban pengguna" />
            }
          >
            <BanIcon data-icon="inline-start" />
            Ban
          </DialogTrigger>
          <DialogHeader className="sr-only">
            <DialogTitle>Ban {user.email}</DialogTitle>
            <DialogDescription>Alasan ban opsional.</DialogDescription>
          </DialogHeader>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Ban pengguna</DialogTitle>
              <DialogDescription>{user.email}</DialogDescription>
            </DialogHeader>
            <form
              id={`ban-form-${user.id}`}
              onSubmit={banForm.handleSubmit(async (values) => {
                const ok = await run("Ban pengguna", "ban", () =>
                  banUserAction(user.id, values.banReason),
                );
                if (ok) {
                  banForm.reset();
                  setBanOpen(false);
                }
              })}
              noValidate
            >
              <FieldGroup>
                <Controller
                  name="banReason"
                  control={banForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`ban-${user.id}`}>
                        Alasan (opsional)
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`ban-${user.id}`}
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setBanOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="destructive"
                form={`ban-form-${user.id}`}
              >
                {pending === "ban" ? (
                  <>
                    <Spinner data-icon="inline-start" /> Memproses…
                  </>
                ) : (
                  "Ban"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog>
        <AlertDialogTrigger
          render={
            <ActionButton disabled={busy || isSelf} title="Hapus pengguna" />
          }
        >
          <Trash2Icon data-icon="inline-start" />
          Hapus
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {user.email}?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini permanen dan tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={busy}
              onClick={() =>
                run("Hapus pengguna", "remove", () =>
                  removeUserAction(user.id),
                )
              }
            >
              {pending === "remove" ? (
                <>
                  <Spinner data-icon="inline-start" /> Menghapus…
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
