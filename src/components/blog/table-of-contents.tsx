"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };

// TOC scroll-spy: membaca h2/h3 artikel (id dari rehype-slug), menandai
// heading yang sedang terlihat. Disembunyikan di < lg.
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(".mdx-body h2[id], .mdx-body h3[id]")
    );
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H3" ? 3 : 2,
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <nav aria-label="Daftar isi" className="sticky top-24 space-y-3 text-sm">
        <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <ListTree className="h-3.5 w-3.5" /> Daftar isi
        </p>
        <ul className="space-y-1 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={activeId === h.id ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l-2 border-transparent py-1 pr-2 transition-colors hover:text-foreground",
                  h.level === 3 ? "pl-6" : "pl-4",
                  activeId === h.id
                    ? "border-foreground font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
