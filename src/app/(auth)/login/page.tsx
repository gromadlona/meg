import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke dashboard admin.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Placeholder — sambungkan ke auth (mis. NextAuth / Supabase) nanti.
        </p>
      </div>
      <form className="space-y-3">
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
          Masuk (disabled)
        </button>
      </form>
      <p className="text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </div>
  );
}
