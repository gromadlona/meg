import {
  FolderGit2,
  Globe,
  LayoutDashboard,
  Newspaper,
  Rocket,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  stack: string[];
  demoHref: string;
  sourceHref: string;
  featured?: boolean;
  accent: string; // gradient classes untuk visual mock
  Icon: LucideIcon;
};

// TODO: ganti dengan project asli + link demo/source beneran.
export const projects: Project[] = [
  {
    slug: "meggi-dev",
    title: "MeGGi.dev",
    description:
      "Portfolio & blog pribadi: Next.js 16 App Router, SSR/SSG SEO-friendly, shadcn + Magic UI, particles & meteors.",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind v4", "shadcn", "Magic UI"],
    demoHref: "/",
    sourceHref: "/about",
    featured: true,
    accent: "from-indigo-500 via-violet-500 to-pink-500",
    Icon: Rocket,
  },
  {
    slug: "dashboard-admin",
    title: "Dashboard Admin",
    description:
      "Contoh area privat: ringkasan konten, manajemen posts, dan pengaturan site — fondasi menuju CMS mini.",
    year: "2026",
    stack: ["Next.js", "Base UI", "shadcn"],
    demoHref: "/dashboard",
    sourceHref: "/about",
    accent: "from-cyan-500 via-sky-500 to-blue-600",
    Icon: LayoutDashboard,
  },
  {
    slug: "blog-ssr",
    title: "Blog SSR",
    description:
      "Blog dengan generateStaticParams + generateMetadata per slug, JSON-LD, sitemap & robots otomatis.",
    year: "2026",
    stack: ["Next.js", "SEO", "MDX (soon)"],
    demoHref: "/blog",
    sourceHref: "/blog/hello-nextjs-ssr",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    Icon: Newspaper,
  },
  {
    slug: "toko-online",
    title: "Toko Online (Konsep)",
    description:
      "Slot konsep: katalog produk, keranjang, dan checkout. Siap diisi saat masuk Fase toko.",
    year: "2025",
    stack: ["React", "Tailwind"],
    demoHref: "/projects",
    sourceHref: "/contact",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    Icon: ShoppingCart,
  },
  {
    slug: "landing-kit",
    title: "Landing Kit",
    description:
      "Koleksi section reusable: hero full-screen, marquee, bento, CTA — yang dipakai homepage ini.",
    year: "2025",
    stack: ["shadcn", "Magic UI", "Motion"],
    demoHref: "/",
    sourceHref: "/blog/roadmap-portfolio-blog",
    accent: "from-fuchsia-500 via-purple-500 to-indigo-600",
    Icon: Globe,
  },
  {
    slug: "arsip-eksperimen",
    title: "Arsip Eksperimen",
    description:
      "Kumpulan percobaan kecil: animasi, route groups, dan pola SSR yang didokumentasikan di blog.",
    year: "2025",
    stack: ["Next.js", "Eksperimen"],
    demoHref: "/blog",
    sourceHref: "/blog/struktur-route-groups",
    accent: "from-slate-500 via-zinc-500 to-neutral-600",
    Icon: FolderGit2,
  },
];

export type Experience = {
  period: string;
  role: string;
  place: string;
  summary: string;
};

// TODO: ganti dengan riwayat asli.
export const experience: Experience[] = [
  {
    period: "2024 — Sekarang",
    role: "Web Developer (Fokus Frontend)",
    place: "Freelance / Proyek Pribadi",
    summary:
      "Membangun landing, blog, dan dashboard dengan Next.js App Router, Tailwind, dan design system shadcn.",
  },
  {
    period: "2023 — 2024",
    role: "Eksperimen React & SSR",
    place: "Belajar Mandiri",
    summary:
      "Mendalami Server Components, routing, caching, dan SEO — fondasi dari website ini.",
  },
  {
    period: "2022 — 2023",
    role: "Mulai Ngoding Web",
    place: "HTML / CSS / JS",
    summary:
      "Fondasi web: semantik HTML, CSS responsif, dan JavaScript modern.",
  },
];

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "UI & Desain",
    skills: ["shadcn/ui", "Base UI", "Magic UI", "Figma", "Lucide"],
  },
  {
    title: "Backend & Tools",
    skills: ["Node.js", "REST API", "Git", "Vercel", "SEO"],
  },
];
