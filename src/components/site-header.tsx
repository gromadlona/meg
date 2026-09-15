import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="MeGGi.dev — home">
          <Image
            src="/brand/logo-icon-clear.png"
            alt="Logo MeGGi"
            width={500}
            height={500}
            priority
            className="h-8 w-8 dark:invert"
          />
          {siteConfig.name}
          <span className="text-muted-foreground">.dev</span>
        </Link>
        {/* Desktop nav: hidden di < md */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 rounded-full bg-foreground px-4 py-1.5 text-background transition-colors hover:opacity-80"
          >
            Login
          </Link>
        </nav>
        {/* Mobile drawer: hanya di < md */}
        <MobileNav />
      </div>
    </header>
  );
}
