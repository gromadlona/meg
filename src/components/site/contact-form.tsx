"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// TODO Fase 4: ganti simulasi ini dengan Server Action / API route
// (mis. kirim via Resend) + validasi + proteksi spam.
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1200);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/40 px-6 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
        <h2 className="font-semibold">Pesan terkirim! (simulasi)</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Backend email belum dipasang — pesan ini belum benar-benar terkirim.
          Untuk sekarang hubungi via email langsung di samping.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Kirim lagi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" placeholder="Nama kamu" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="kamu@email.dev"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Ceritakan project atau sapaanmu…"
          rows={5}
          required
        />
      </div>
      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Mengirim…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Kirim Pesan
          </>
        )}
      </Button>
    </form>
  );
}
