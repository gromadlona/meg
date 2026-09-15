import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Buat akun admin baru.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="text-sm text-muted-foreground">
          Placeholder — nonaktif sampai auth dipasang.
        </p>
      </div>
      <form className="space-y-3">
        <input
          placeholder="Nama"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          placeholder="Email"
          type="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <button
          type="button"
          className="w-full rounded-md bg-foreground py-2 text-sm font-medium text-background"
        >
          Daftar (disabled)
        </button>
      </form>
      <p className="text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
