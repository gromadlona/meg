"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buka menu navigasi"
            className="md:hidden"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/brand/logo-icon-clear.png"
              alt="Logo MeGGi"
              width={500}
              height={500}
              className="h-6 w-6 dark:invert"
            />
            {siteConfig.name}
            <span className="text-muted-foreground">.dev</span>
          </SheetTitle>
          <SheetDescription>
            Portfolio & blog pribadi
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-sm font-medium text-background"
            )}
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
