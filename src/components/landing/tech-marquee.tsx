import {
  Code2,
  Component,
  Cpu,
  Globe,
  Layers,
  Palette,
  Rocket,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const stack = [
  { Icon: Zap, label: "Next.js 16" },
  { Icon: Code2, label: "TypeScript" },
  { Icon: Cpu, label: "React 19" },
  { Icon: Palette, label: "Tailwind v4" },
  { Icon: Component, label: "shadcn/ui" },
  { Icon: Layers, label: "Base UI" },
  { Icon: Sparkles, label: "Magic UI" },
  { Icon: Search, label: "SEO & SSR" },
  { Icon: Rocket, label: "Vercel" },
  { Icon: Globe, label: "Web Vitals" },
];

export function TechMarquee() {
  return (
    <section aria-label="Tech stack" className="space-y-4">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Dibangun dengan stack modern
      </p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover repeat={3} className="[--duration:32s]">
          {stack.map(({ Icon, label }) => (
            <div
              key={label}
              className="mx-2 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
