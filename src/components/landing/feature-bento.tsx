import { FolderGit2, Layers, PenLine, Zap } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

function ScoreBackground() {
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute h-56 w-56 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative rounded-2xl border border-border bg-background/80 px-6 py-4 text-center shadow-sm backdrop-blur">
        <p className="text-4xl font-semibold tracking-tight">100</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          PageSpeed • SEO
        </p>
      </div>
    </div>
  );
}

function ProjectsBackground() {
  return (
    <div className="relative flex h-44 items-end justify-center gap-2 overflow-hidden p-4">
      {[40, 70, 55].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="w-16 rounded-t-lg border border-border bg-muted/70"
        />
      ))}
      <Badge className="absolute top-4 right-4 rounded-full">12+ shipped</Badge>
    </div>
  );
}

function BlogBackground() {
  return (
    <div className="flex h-44 flex-col justify-center gap-2.5 p-6">
      <div className="h-3 w-3/4 rounded-full bg-foreground/80" />
      <div className="h-2.5 w-full rounded-full bg-muted-foreground/30" />
      <div className="h-2.5 w-5/6 rounded-full bg-muted-foreground/30" />
      <div className="h-2.5 w-2/3 rounded-full bg-muted-foreground/20" />
    </div>
  );
}

function StackBackground() {
  return (
    <div className="relative h-44 overflow-hidden">
      <AnimatedGridPattern
        numSquares={18}
        maxOpacity={0.35}
        duration={3}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6">
        {["Next.js", "React", "Tailwind", "shadcn", "Motion"].map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function FeatureBento() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Kenapa mampir?
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Satu tempat untuk karya & tulisan
        </h2>
      </div>
      <BentoGrid className="grid-cols-1 auto-rows-auto md:grid-cols-3 md:auto-rows-[22rem]">
        <BentoCard
          name="SSR & SEO bawaan"
          description="Halaman publik di-render di server: cepat dibuka, mudah di-index Google, enak di-share."
          Icon={Zap}
          href="/blog/hello-nextjs-ssr"
          cta="Baca penjelasannya"
          background={<ScoreBackground />}
          className="md:col-span-2"
        />
        <BentoCard
          name="Project pilihan"
          description="Kumpulan eksperimen & karya, dari landing hingga dashboard."
          Icon={FolderGit2}
          href="/projects"
          cta="Lihat semua"
          background={<ProjectsBackground />}
          className="md:col-span-1"
        />
        <BentoCard
          name="Blog pribadi"
          description="Catatan seputar Next.js, performa, dan proses belajar."
          Icon={PenLine}
          href="/blog"
          cta="Mulai membaca"
          background={<BlogBackground />}
          className="md:col-span-1"
        />
        <BentoCard
          name="Stack modern"
          description="Next.js 16, React 19, Tailwind v4, shadcn + Magic UI — selalu mengikuti best practice terbaru."
          Icon={Layers}
          href="/about"
          cta="Tentang saya"
          background={<StackBackground />}
          className="md:col-span-2"
        />
      </BentoGrid>
    </section>
  );
}
