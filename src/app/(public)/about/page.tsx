import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Globe, Mail, MapPin, Rss } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { experience, skillGroups } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tentang MeGGi: web developer fokus frontend — Next.js, React, dan design system.",
};

const socials = [
  { Icon: Globe, label: "Website", href: "/" },
  { Icon: AtSign, label: "Media sosial", href: "/contact" },
  { Icon: Rss, label: "RSS Blog", href: "/blog" },
  { Icon: Mail, label: "Email", href: "/contact" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      {/* Bio */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar className="h-24 w-24 text-2xl sm:h-28 sm:w-28">
          <AvatarImage
            src="/brand/logo-icon-clear.png"
            alt="Logo MeGGi"
            className="bg-white object-cover dark:invert"
          />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 font-semibold text-white">
            M
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Halo, saya MeGGi 👋
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Indonesia • Web Developer (Frontend)
          </p>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Saya membangun antarmuka web yang cepat, aksesibel, dan enak
            dilihat — dengan fokus pada Next.js App Router, Server Components,
            dan design system. Website ini adalah rumah untuk karya dan catatan
            belajar saya.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {socials.map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={cn(buttonVariants({ variant: "outline", size: "icon-sm" }), "rounded-full")}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full px-5")}
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Keahlian
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle className="text-base">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Perjalanan
        </h2>
        <ol className="relative space-y-6 border-l border-border pl-6">
          {experience.map((item) => (
            <li key={item.period} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full bg-foreground"
              />
              <p className="font-mono text-xs text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-1 font-medium">
                {item.role} — {item.place}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
