import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-center gap-2">
          <Image
            src="/brand/logo-icon-clear.png"
            alt="Logo MeGGi"
            width={500}
            height={500}
            loading="lazy"
            className="h-5 w-5 dark:invert"
          />
          © {new Date().getFullYear()} {siteConfig.author}. Dibangun dengan
          Next.js SSR.
        </p>
        <p className="font-mono text-xs">
          (public) • SEO-friendly • placeholder fase 1
        </p>
      </div>
    </footer>
  );
}
