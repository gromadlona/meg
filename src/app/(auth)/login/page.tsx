import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke dashboard admin.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/dashboard");

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Masuk untuk mengelola dashboard admin.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
