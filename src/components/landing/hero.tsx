import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

const stats = [
  { value: 12, suffix: "+", label: "Project selesai" },
  { value: 3, suffix: "+", label: "Tahun ngoding" },
  { value: 100, suffix: "", label: "Skor PageSpeed" },
];

// Full-bleed hero setinggi viewport (dikurangi tinggi header h-16).
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center justify-center overflow-hidden border-b border-border">
      {/* Background full-bleed: grid + particles interaktif */}
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.4}
        duration={3}
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]"
      />
      {/* Particles multi-warna: 1 warna per layer (API MagicUI), total 180 */}
      <Particles
        quantity={60}
        ease={80}
        size={0.7}
        color="#4f46e5"
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]"
      />
      <Particles
        quantity={60}
        ease={70}
        size={0.6}
        vx={0.05}
        color="#ec4899"
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      />
      <Particles
        quantity={60}
        ease={90}
        size={0.5}
        vx={-0.05}
        color="#8b5cf6"
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <Badge variant="outline" className="gap-1.5 rounded-full px-3.5 py-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Portfolio & Blog — Next.js 16, SSR
        </Badge>

        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          Halo, saya MeGGi.
          <br />
          Saya membangun web yang{" "}
          <AnimatedGradientText
            colorFrom="#4f46e5"
            colorTo="#ec4899"
            speed={1.2}
          >
            cepat & hidup.
          </AnimatedGradientText>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
          Selamat datang di{" "}
          <span className="font-mono font-medium text-foreground">
            MeGGi.dev
          </span>{" "}
          — portfolio & blog pribadi tentang eksperimen web modern: performa,
          SEO, dan desain yang nyaman dilihat.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/projects" aria-label="Lihat projects">
            <ShimmerButton className="px-8 py-3.5 text-sm font-medium">
              Lihat Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </ShimmerButton>
          </Link>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}
          >
            <BookOpen className="h-4 w-4" />
            Baca Blog
          </Link>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-border pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dd className="text-3xl font-semibold tracking-tight sm:text-5xl">
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </dd>
              <dt className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
