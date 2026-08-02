"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Send, CheckCircle2 } from "lucide-react";

const WHATSAPP = "23674017878";

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", telephone: "", sujet: "", message: "" });
  const [envoi, setEnvoi] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState("");

  const maj = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Une erreur est survenue");
      }
      setSucces(true);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
          Contact
        </span>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Parlons de votre projet</h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
          Écrivez-nous ou joignez-nous directement sur WhatsApp.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" className="flex items-center gap-4 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-5 transition-colors hover:bg-[#25D366]/20">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white"><MessageCircle className="h-5 w-5" /></span>
            <span><span className="block text-sm font-semibold">WhatsApp</span><span className="text-sm text-[var(--muted)]">74 01 78 78</span></span>
          </a>
          <a href="tel:+23675437878" className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--gold)]">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]"><Phone className="h-5 w-5" /></span>
            <span><span className="block text-sm font-semibold">Téléphone</span><span className="text-sm text-[var(--muted)]">75 43 78 78</span></span>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]"><MapPin className="h-5 w-5" /></span>
            <span><span className="block text-sm font-semibold">Localisation</span><span className="text-sm text-[var(--muted)]">République Centrafricaine</span></span>
          </div>
        </div>

        {succes ? (
          <div className="grid place-items-center rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow)]">
            <div>
              <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[var(--gold)]" />
              <h2 className="font-display text-2xl font-semibold">Message envoyé !</h2>
              <p className="mt-2 text-[var(--muted)]">Nous vous répondrons dans les meilleurs délais.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
            {erreur && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{erreur}</div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Votre nom</label>
                <input type="text" placeholder="Nom & prénom" className="se-input" value={form.nom} onChange={(e) => maj("nom", e.target.value)} required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Téléphone</label>
                <input type="tel" placeholder="+236 ..." className="se-input" value={form.telephone} onChange={(e) => maj("telephone", e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Sujet</label>
              <input type="text" placeholder="Objet de votre message" className="se-input" value={form.sujet} onChange={(e) => maj("sujet", e.target.value)} />
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Message</label>
              <textarea rows={5} placeholder="Votre message..." className="se-input resize-y" value={form.message} onChange={(e) => maj("message", e.target.value)} required />
            </div>
            <button type="submit" disabled={envoi} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-4 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:opacity-60">
              {envoi ? "Envoi en cours..." : <>Envoyer le message <Send className="h-4 w-4" /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}