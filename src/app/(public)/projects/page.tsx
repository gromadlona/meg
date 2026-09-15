import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project pilihan MeGGi: eksperimen Next.js, dashboard, blog SSR, dan landing kit.",
};

export default function ProjectsPage() {
  const [featured, ...rest] = projects;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-2xl space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="text-muted-foreground sm:text-lg">
          Kumpulan karya & eksperimen — dari website ini sendiri sampai konsep
          yang sedang dimasak.
        </p>
      </div>

      {/* Featured */}
      <Card className="overflow-hidden md:grid md:grid-cols-2">
        <div
          className={cn(
            "relative flex min-h-56 items-center justify-center bg-gradient-to-br sm:min-h-72",
            featured.accent
          )}
        >
          <featured.Icon className="h-20 w-20 text-white/90 drop-shadow-lg sm:h-24 sm:w-24" />
          <Badge className="absolute top-4 left-4 rounded-full">
            Featured • {featured.year}
          </Badge>
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl">
            {featured.title}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            {featured.description}
          </CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {featured.stack.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-full">
                {s}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              href={featured.demoHref}
              className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={featured.sourceHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full"
              )}
            >
              Detail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Card key={p.slug} className="flex flex-col overflow-hidden pt-0">
            <div
              className={cn(
                "flex h-36 items-center justify-center bg-gradient-to-br",
                p.accent
              )}
            >
              <p.Icon className="h-12 w-12 text-white/90 drop-shadow" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="rounded-full font-mono text-xs">
                  {p.year}
                </Badge>
              </div>
              <CardTitle className="mt-2">{p.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {p.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto gap-4 border-t-0 bg-transparent">
              <Link
                href={p.demoHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={p.sourceHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Detail <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Suka yang kamu lihat?{" "}
        <Link href="/contact" className="font-medium text-foreground underline">
          Ajak kolaborasi →
        </Link>
      </p>
    </div>
  );
}
