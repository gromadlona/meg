export const siteConfig = {
  name: "MeGGi",
  title: "MeGGi — Portfolio & Blog Pribadi",
  description:
    "Portfolio dan blog pribadi: eksperimen Next.js App Router, SSR SEO-friendly, tulisan seputar web development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id-ID",
  author: "MeGGi",
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
