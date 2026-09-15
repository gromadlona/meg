# PROJECT.md — meg (Portfolio & Blog Pribadi)

> Acuan utama untuk AI agent / model yang bekerja di repo ini.
> Baca file ini dulu sebelum menulis kode. melengkapi `AGENTS.md` (aturan Next.js)
> dan `README.md` (panduan create-next-app bawaan).

## 1. Identitas & Tujuan

- **Nama:** meg — website portfolio + blog pribadi sederhana tapi rich.
- **Status:** Fase 1, 2a, 2b, 3 selesai — base routes, landing wow full-width,
  halaman publik rich, blog MDX + SEO. Sisa: Fase 4 (auth + DB), Fase 5 (deploy).
- **Target:** halaman publik super cepat & SEO-friendly (SSR/SSG Next.js),
  halaman auth terpisah, dashboard admin privat (noindex).
- **Bahasa konten & `<html lang>`:** Indonesia (`id`).
- **Branch utama:** `master`.

## 2. Tech Stack (terkunci)

| Lapisan   | Pilihan | Catatan |
| --------- | ------- | ------- |
| Framework | Next.js `16.3.5` (App Router, Turbopack) | BUKAN Pages Router. API bisa beda dari training data — wajib cek `node_modules/next/dist/docs/` sebelum coding |
| React     | `19.2.8` | Server Components = default |
| Styling   | Tailwind CSS `v4` + `tw-animate-css` + `shadcn/tailwind.css` | Token via `@theme inline` di `globals.css`, dark mode via `.dark` + `@custom-variant` |
| UI        | shadcn `base-nova`, baseColor `neutral`, lucide icons, `@base-ui/react` | Komponen ditambah sebagai source via CLI, bukan dependency |
| Font      | `Outfit` (sans/body), `Geist`, `Geist_Mono` | via `next/font/google`, CSS vars di root layout |
| Util      | `cn` (`@/lib/utils` → re-export dari paket `cn`), `class-variance-authority` | Selalu pakai warna semantik (`bg-primary`, `text-muted-foreground`), jangan raw (`bg-blue-500`) |
| Data (now)| MDX lokal (`src/content/blog/*.mdx`, frontmatter via `gray-matter`) | Nanti: CMS / DB + ISR |

Path alias: `@/*` → `./src/*` (lihat `tsconfig.json`).
`components.json` aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.

## 3. Perintah Penting

```bash
npm run dev    # dev server (http://localhost:3000, MCP aktif di /_next/mcp)
npm run build  # build produksi (Turbopack) — wajib lolos sebelum selesai task
npm run start  # serve hasil build
npm run lint   # eslint
```

> **Windows note:** PowerShell di mesin ini memblokir `npm.ps1`
> (`ExecutionPolicy`). Jalankan via `& "C:\Program Files\nodejs\npm.cmd" run build`
> atau setara. Jangan ubah policy tanpa izin user.

Env:

```bash
NEXT_PUBLIC_SITE_URL=https://domain-asli.dev  # default fallback http://localhost:3000 (src/lib/site.ts)
```

## 4. Struktur Direktori

```
src/
  app/
    layout.tsx            # ROOT layout (wajib: <html lang="id"> + <body>). SEO base: metadataBase, title template, OG, twitter
    globals.css           # Tailwind v4 + token shadcn base-nova + CSS Shiki/TOC
    sitemap.ts            # /sitemap.xml (dari frontmatter MDX via getPosts())
    robots.ts             # /robots.txt (allow /, disallow /dashboard /login /register)
    rss/route.ts          # /rss — feed RSS 2.0 dari getPosts()
    (public)/             # GRUP PUBLIK — URL bersih, layout header+footer, SEO/index
      layout.tsx          # SiteHeader + SiteFooter, FULL-WIDTH (tanpa max-w).
                        # Tiap page atur container sendiri: konten lebar
                        # `max-w-7xl px-4 sm:px-6 lg:px-8`, hero full-bleed
                        # `min-h-[calc(100svh-4rem)]`, artikel `max-w-2xl`.
      page.tsx            # / — landing MeGGi.dev (async SC): Hero full-bleed
                        # h-screen + bento + blog Cards + CTA dark bermeteors.
      blog/page.tsx       # /blog — list SSR + <link rel=alternate> RSS
      blog/[slug]/page.tsx# /blog/:slug — SSG + dynamicParams=false + MDX + TOC + JSON-LD
      blog/[slug]/opengraph-image.tsx  # OG PNG dinamis per slug (runtime nodejs)
      about/page.tsx      # /about
      projects/page.tsx   # /projects
      contact/page.tsx    # /contact
    (auth)/               # GRUP AUTH — layout centered, noindex
      layout.tsx
      login/page.tsx      # /login (form disabled, robots noindex)
      register/page.tsx   # /register (idem)
    (private)/            # GRUP ADMIN — sidebar, noindex, BELUM diproteksi
      layout.tsx          # TODO: cek session + redirect ke /login
      dashboard/page.tsx  # /dashboard — kartu statistik dummy
      dashboard/posts/page.tsx
      dashboard/settings/page.tsx
  components/
    site-header.tsx       # nav publik (baca siteConfig.nav) + slot MobileNav
    site-footer.tsx
    mobile-nav.tsx        # "use client" island: Sheet drawer kanan (lihat §10)
    table-of-contents.tsx # "use client" island: TOC scroll-spy artikel (baca h2/h3)
    contact-form.tsx      # "use client" island: form kontak (submit SIMULASI, TODO Fase 4)
    landing/              # section homepage: hero.tsx, tech-marquee.tsx, feature-bento.tsx
    ui/                   # via CLI saja (§7): button, badge, card, separator, sheet,
                          # avatar, input, textarea, label,
                          # bento-grid, marquee, animated-gradient-text, number-ticker,
                          # animated-grid-pattern, shimmer-button, particles, meteors
  lib/
    site.ts               # siteConfig: name, title, description, url, locale, nav
    posts.ts              # metadata posts dari frontmatter MDX (fs + gray-matter)
    mdx.ts                # kompilasi MDX via evaluate() + rehype (slug, pretty-code)
    projects.ts           # projects + experience + skillGroups (TODO: data asli)
    utils.ts              # re-export { cn }
  content/blog/*.mdx      # artikel: frontmatter (title/desc/date/tags) + markdown
  mdx-components.tsx      # komponen global MDX (link, h2/h3, tabel…; JANGAN override pre/code)
```

**Brand & aset (`public/`)** — favicon set + logo, dipisah per peran:
- `public/favicon.ico` — di root agar auto-serve di `/favicon.ico` (fallback browser lawas).
- `public/favicons/` — 16/32 png, apple-touch 180, android-chrome 192/512,
  `site.webmanifest` (name "MeGGi.dev", theme `#09090b`). Dirujuk via
  `metadata.icons` + `manifest: "/favicons/site.webmanifest"` di root layout.
- `public/brand/` — `logo-icon(-clear).png` + `logo(-clear).png` (500×500).
  Transparan (`*-clear`) untuk in-page via `next/image` + `dark:invert`:
  header (`priority`, h-8), footer (lazy, h-5), drawer (h-6), avatar About
  (`AvatarImage` + bg-white + fallback "M"). Lockup full (`logo-clear.png`)
  cadangan hero/splash. OG root: `/brand/logo.png`; OG artikel: dinamis per slug
  (file convention, URL berhases). `viewport.themeColor` light/dark diset.
- ⚠️ **JANGAN taruh `favicon.ico`/`icon.*`/`apple-icon.*` di `src/app/`.**
  File convention itu auto-generate `<link rel="icon">` dan menimpa
  `metadata.icons` + membayangi `public/favicon.ico`. Satu sumber kebenaran:
  `public/` + `metadata`.

**15+ routes terdaftar** (cek via next-devtools `get_routes`):
`/`, `/blog`, `/blog/[slug]` (×3 slug SSG), `/about`, `/projects`,
`/contact`, `/login`, `/register`, `/dashboard`, `/dashboard/posts`,
`/dashboard/settings`, `/robots.txt`, `/sitemap.xml`, `/rss`,
plus OG image dinamis per slug (URL berhases, lihat tag `og:image`).

## 5. Pola Wajib (jangan dilanggar)

1. **Route Groups `(nama)` tidak masuk URL.** `(public)/blog/page.tsx` → `/blog`.
   Jangan bikin dua grup me-resolve ke path sama (mis. `(public)/about` +
   `(private)/about` = error).
2. **Server Component default.** Tambah `"use client"` hanya bila perlu
   interaktivitas (form, state, event). Metadata / `generateMetadata` hanya di SC.
3. **Next 16 breaking: `params` & `searchParams` adalah `Promise`.**
   ```tsx
   type Props = { params: Promise<{ slug: string }> };
   export default async function Page({ params }: Props) {
     const { slug } = await params; // wajib await / React.use()
   }
   ```
4. **SEO publik vs privat:**
   - Publik: `metadata` statis atau `generateMetadata` dinamis + OG article +
     JSON-LD + masuk `sitemap.ts`.
   - Auth & private: `robots: { index: false }` + sudah di-disallow di `robots.ts`.
5. **Data fetching di server:** `async` SC + `await getPosts()` dsb. Sumber saat ini
   frontmatter MDX via `fs` + `gray-matter` (Node runtime, build-time/SSG);
   saat ganti ke CMS/DB pertahankan signature async agar difusi minimal.
6. **Styling:** Tailwind utilities + token shadcn + `cn()`. Variants via CVA.
   Ikon via `lucide-react` — TAPI brand icons (`Github`, `Twitter`, `Linkedin`)
   sudah DIHAPUS di versi terpasang; pakai generik (`Globe`, `AtSign`, `Rss`,
   `Mail`, …). Navigasi selalu `next/link`.
7. **Bahasa & A11y:** `lang="id"`, heading hierarkis, alt text bermakna.
8. **Docs dulu:** untuk API Next yang diragukan (caching, metadata, route config),
   baca `node_modules/next/dist/docs/01-app/...` yang relevan sebelum coding.
   Contoh: `03-api-reference/03-file-conventions/route-groups.md`,
   `.../page.md`, `.../04-functions/generate-static-params.md`,
   `01-getting-started/14-metadata-and-og-images.md`.
   Online (samakan router! project ini App Router): MDX
   `https://nextjs.org/docs/app/guides/mdx` (JANGAN yang `/docs/pages/...`),
   OG `.../03-file-conventions/01-metadata/opengraph-image`.

## 6. Skills & MCP Terdaftar

`opencode.json` → 3 MCP (semua `enabled: true`):
- `shadcn` — tambah/cari komponen. Registry aktif: `@shadcn` (471 items).
  `components.json` punya `registries: {}` jadi **selalu pass eksplisit**
  `registries: ["@shadcn"]` saat list/search.
- `next-devtools` — MCP dev server (port 3000, 9 tools): `get_routes`,
  `get_errors`, `get_page_metadata`, `compile_route`, `get_compilation_issues`, dsb.
  Wajib dipakai untuk verifikasi runtime, bukan sekadar `build` lolos.
- `magicuidesign-mcp` — 250 items animasi/efek (beam, marquee, mockup, bento…).
  Dipakai di landing (marquee, bento, particles, meteors, …).

`.agents/skills/` → 3 skills (`skills-lock.json` v1):
- `shadcn` — prinsip: pakai komponen existing dulu, compose, variants bawaan, warna semantik.
- `next-dev-loop` — loop verifikasi: ubah → cek `/_next/mcp` → cek browser → konfirmasi.
- `migrate-radix-to-base` — migrasi komponen Radix lama ke Base UI (repo sudah Base UI).

`list_mcp_resources` kosong = normal (MCP ini expose tools, bukan resources).

## 7. Menambah Komponen shadcn / MagicUI (WAJIB via CLI)

> Aturan keras: komponen UI **wajib** dipasang lewat CLI shadcn sesuai dokumentasi.
> **Dilarang** copy-paste kode dari web atau membuat file komponen secara manual,
> **kecuali** item yang diinginkan memang tidak ada di registry mana pun
> (sudah dibuktikan via `search` + `view`).

**Perintah resmi** (project ini pakai npm → runner `npx`):

```bash
npx shadcn@latest add card                    # dari @shadcn (boleh multi: button card dialog)
npx shadcn@latest add @magicui/bento-grid     # dari registry komunitas @magicui
npx shadcn@latest add owner/repo/item         # dari registry pihak ketiga lain
```

**Workflow wajib tiap kali tambah komponen** (dari `.agents/skills/shadcn/SKILL.md`):

1. **Cek yang sudah terpasang dulu** — lihat daftar `components` di project context
   atau isi direktori `src/components/ui/`. Jangan import yang belum di-add,
   jangan re-add yang sudah ada.
2. **Cari** — `npx shadcn@latest search -q "<kata-kunci>"`
   (atau MCP `shadcn_search_items_in_registries` / `magicuidesign-mcp_searchRegistryItems`
   untuk discovery; instalasi tetap via CLI).
3. **Baca docs + contoh** — `npx shadcn@latest docs <komponen>` lalu fetch URL-nya;
   `npx shadcn@latest view @registry/<item>` untuk item yang belum dipasang.
   Jangan menebak API dari ingatan.
4. **Pasang** — `npx shadcn@latest add ...` (lihat perintah resmi di atas).
5. **Review hasil add** — selalu `Read` file yang ditambahkan dan verifikasi:
   sub-komponen lengkap, import benar, tidak melanggar Critical Rules (§5).
6. **Perbaiki import third-party** — komponen dari registry komunitas
   (`@magicui`, `@bundui`, dsb.) sering memakai path hardcoded `@/components/ui/...`.
   Samakan dengan alias project ini (`@/components/ui`, lihat `components.json`).
   Ikon project = `lucide` (`lucide-react`) — jika item memakai set ikon lain,
   ganti import + nama ikonnya.
7. **Verifikasi** — `build` lolos + cek runtime via next-devtools bila dev server jalan.

**Aturan tambahan:**

- **Registry harus eksplisit.** Jangan menebak registry atas nama user.
  Kalau user minta komponen tanpa menyebut registry ("tambahin login form"),
  tanya dulu: `@shadcn`, `@magicui`, atau registry lain?
- **Update komponen: preview dulu.** `npx shadcn@latest add <komponen> --dry-run`
  lalu `--diff <file>` per file. **Jangan** pakai `--overwrite` tanpa persetujuan
  eksplisit user. **Jangan** fetch file mentah dari GitHub secara manual.
- **Pengecualian manual-create** hanya bila: `search` + `view` di semua registry
  terkonfigurasi tidak menemukan item yang diminta. Catat buktinya di laporan,
  lalu buat komponen custom mengikuti pola shadcn (CVA variants, warna semantik,
  `cn()`, ikon lucide).

## 8. Alur Kerja AI di Repo Ini

1. Baca `PROJECT.md` (file ini) + file yang akan diubah (wajib `Read` dulu sebelum `Edit`).
2. Untuk perubahan App Router: cek docs Next yang relevan (lihat §5.8).
3. Implementasi kecil + terarah; jangan rename massal tanpa diminta.
4. Verifikasi: `build` lolos + (bila ada dev server) `get_errors` / `get_routes` /
   `compile_route` bersih + cek visual bila ubahan UI.
5. Laporkan: file diubah, route terdampak, cara uji manual.

## 9. Roadmap

- [x] Fase 1 — base routes `(public)/(auth)/(private)`, blog SSR dummy, SEO fondasi.
- [x] Fase 2a — landing "wow" full-width (`max-w-7xl`, hero full-bleed
  `min-h-[calc(100svh-4rem)]`): grid-pattern + **particles 3 layer warna brand
  (indigo #4f46e5 / pink #ec4899 / violet #8b5cf6 @60 = 180 total)** + gradient
  text + shimmer CTA + number ticker, marquee stack, bento, blog Cards,
  CTA panel dark + meteors. File registry MagicUI tidak dioprek (1 warna/layer).
  Responsif + drawer nav (`MobileNav`).
- [x] Fase 2b — `/projects` (featured + grid dari `lib/projects.ts`), `/about`
  (avatar, skills, timeline, socials), `/contact` (info + `ContactForm` client
  island, submit masih simulasi — TODO backend Fase 4). Komponen baru via CLI:
  avatar, input, textarea, label.
- [x] Fase 3 — blog rich: MDX asli (`src/content/blog/*.mdx` + frontmatter via
  `gray-matter`), highlight Shiki (`rehype-pretty-code` light+dark),
  anchor + TOC scroll-spy (`rehype-slug` + `TableOfContents` island),
  OG dinamis per slug (`opengraph-image.tsx`, `runtime nodejs`), RSS (`/rss` +
  `<link rel=alternate>`). Arsitektur: kompilasi saat render via
  `evaluate()` di `src/lib/mdx.ts` + komponen global `src/mdx-components.tsx`
  (**JANGAN** `@next/mdx` loader — Turbopack menolak opsi fungsi; mode string
  gagal resolve; lihat `next.config.ts`). URL OG riil berhases
  (`/blog/:slug/opengraph-image-<hash>?…`), diambil dari tag `og:image`.
- [ ] Fase 4 — auth beneran + proteksi `(private)` (middleware/session) + CRUD posts + DB.
- [ ] Fase 5 — i18n?, analytics, web vitals, deploy (Vercel / self-host).

## 10. Yang BELUM Ada (jangan diasumsikan ada)

- Auth/session, middleware, DB, CMS, upload, search, komentar, analytics.
- `src/components/ui/*` terisi via CLI (jangan buat manual): `@shadcn` → button,
  badge, card, separator, sheet, avatar, input, textarea, label; `@magicui` →
  bento-grid, marquee, animated-gradient-text, number-ticker,
  animated-grid-pattern, shimmer-button, particles, meteors. Dep tambahan: `motion`.
  Ikon selalu `lucide-react` (bento-grid sudah di-swap dari radix-icons).
- Navigasi responsif: `SiteHeader` (SC) + `MobileNav` (client island, Sheet drawer
  dari kanan, active-state via `usePathname`). Desktop nav `hidden md:flex`,
  tombol hamburger `md:hidden`. Jangan jadikan seluruh header client.
- `next.config.ts` polos (MDX dikompilasi saat render, lihat `src/lib/mdx.ts`).
  `sitemap.ts` memakai tanggal frontmatter asli.
