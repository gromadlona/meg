import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

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
          Masuk untuk mengelola dashboard admin.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
