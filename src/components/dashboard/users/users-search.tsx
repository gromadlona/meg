"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UsersSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = React.useState(initial);
  const [debounced] = useDebounce(value, 400);

  React.useEffect(() => {
    const q = debounced.trim();
    const current = searchParams.get("q") ?? "";
    if (q === current.trim()) return;
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="relative flex-1">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari email…"
        autoComplete="off"
        className="pl-8"
        aria-label="Cari pengguna"
      />
    </div>
  );
}
