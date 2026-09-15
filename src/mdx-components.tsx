import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Komponen global untuk konten MDX (dipakai semua artikel blog).
// PENTING: jangan override `pre`/`code` — dimiliki rehype-pretty-code (Shiki).
function SmartLink({
  href = "",
  className,
  ...props
}: React.ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: SmartLink,
    h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
      <h2
        className={cn(
          "mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }: React.ComponentProps<"p">) => (
      <p className={cn("leading-7", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
      <ul className={cn("list-disc space-y-2 pl-6", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
      <ol className={cn("list-decimal space-y-2 pl-6", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
      <blockquote
        className={cn(
          "border-l-2 border-foreground/20 pl-4 text-muted-foreground italic",
          className
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "border-b border-border bg-muted/50 px-4 py-2 text-left font-medium",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td className={cn("border-b border-border px-4 py-2 last:border-0", className)} {...props} />
    ),
    hr: ({ className, ...props }: React.ComponentProps<"hr">) => (
      <hr className={cn("border-border", className)} {...props} />
    ),
    ...components,
  };
}
