import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Pendaftaran akun nonaktif — hubungi admin.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="text-sm text-muted-foreground">
          Pendaftaran publik nonaktif. Akun dibuat oleh admin via dashboard.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
