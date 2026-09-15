import Link from "next/link";

// Layout auth: centered, tanpa header/footer publik.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link href="/" className="mb-6 font-semibold tracking-tight">
        MeGGi<span className="text-muted-foreground">.dev</span>
      </Link>
      <div className="w-full max-w-sm rounded-xl border border-border p-6">
        {children}
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        (auth) • placeholder — belum ada logic
      </p>
    </div>
  );
}
