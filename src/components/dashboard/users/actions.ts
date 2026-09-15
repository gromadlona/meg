"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { auth } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; message: string };

const roleSchema = z.enum(["admin", "user"]);
const createSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: roleSchema,
});

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "admin") throw new Error("FORBIDDEN");
  return session;
}

function toMessage(e: unknown) {
  if (e instanceof Error) {
    if (e.message === "FORBIDDEN") return "Hanya admin yang boleh.";
    return e.message;
  }
  return "Terjadi kesalahan.";
}

function revalidateUsers() {
  revalidatePath("/dashboard/users");
}

export async function createUserAction(
  input: z.infer<typeof createSchema>,
): Promise<ActionResult> {
  try {
    const parsed = createSchema.parse(input);
    const session = await requireAdmin();
    if (parsed.email.toLowerCase() === session.user.email.toLowerCase()) {
      // tetap boleh bila belum ada? biarkan API yang menolak duplikat
    }
    await auth.api.createUser({
      body: {
        name: parsed.name,
        email: parsed.email,
        password: parsed.password,
        role: parsed.role,
      },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}

export async function setRoleAction(
  userId: string,
  role: z.infer<typeof roleSchema>,
): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    if (userId === session.user.id)
      return { ok: false, message: "Tidak bisa ubah role akun sendiri." };
    await auth.api.setRole({
      body: { userId, role: roleSchema.parse(role) },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}

export async function setPasswordAction(
  userId: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = z.string().min(8).max(128).parse(newPassword);
    await auth.api.setUserPassword({
      body: { userId, newPassword: parsed },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}

export async function banUserAction(
  userId: string,
  banReason?: string,
): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    if (userId === session.user.id)
      return { ok: false, message: "Tidak bisa ban akun sendiri." };
    await auth.api.banUser({
      body: {
        userId,
        banReason: banReason?.trim() ? banReason.trim().slice(0, 200) : undefined,
      },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}

export async function unbanUserAction(userId: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await auth.api.unbanUser({
      body: { userId },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}

export async function removeUserAction(userId: string): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    if (userId === session.user.id)
      return { ok: false, message: "Tidak bisa hapus akun sendiri." };
    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    });
    revalidateUsers();
    return { ok: true };
  } catch (e) {
    return { ok: false, message: toMessage(e) };
  }
}
