import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Layout khusus halaman publik: header + footer + SSR.
// Full-width: layout TIDAK membatasi lebar — tiap page mengatur
// container-nya sendiri (hero full-bleed, konten max-w-7xl).
// URL tetap bersih (/blog, bukan /(public)/blog).
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="w-full flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
