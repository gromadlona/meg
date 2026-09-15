import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hubungi MeGGi: kolaborasi, freelance, atau diskusi web development.",
};

const info = [
  { Icon: Mail, title: "Email", value: "halo@meggi.dev", note: "Balasan < 2×24 jam" },
  { Icon: MapPin, title: "Lokasi", value: "Indonesia", note: "Terbuka remote" },
  { Icon: Clock, title: "Jadwal", value: "Senin — Jumat", note: "Fleksibel untuk urgent" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-2xl space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Contact
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Hubungi saya
        </h1>
        <p className="text-muted-foreground sm:text-lg">
          Ceritakan kebutuhanmu — saya akan membalas secepatnya.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {info.map(({ Icon, title, value, note }) => (
            <Card key={title}>
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pl-[68px] text-sm text-muted-foreground">
                {note}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Kirim pesan</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
