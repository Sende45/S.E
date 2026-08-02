"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";

function DevisForm() {
  const params = useSearchParams();
  const poleParam = params.get("pole");

  const [poles, setPoles] = useState<string[]>(poleParam ? [poleParam] : ["traiteur"]);
  const [form, setForm] = useState({
    typeEvenement: "Mariage",
    dateEvenement: "",
    nombreInvites: "",
    budgetIndicatif: "",
    nomContact: "",
    telephone: "",
    message: "",
  });
  const [envoi, setEnvoi] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState("");

  const maj = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const togglePole = (p: string) =>
    setPoles((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, poles }),
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

  const polesDispo = [
    { id: "traiteur", label: "Traiteur" },
    { id: "decoration", label: "Décoration" },
    { id: "evenementiel", label: "Événementiel" },
  ];

  if (succes) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-md rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow)]">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[var(--gold)]" />
          <h1 className="font-display text-3xl font-semibold">Demande envoyée !</h1>
          <p className="mt-3 text-[var(--muted)]">
            Merci. L&apos;équipe S.E revient vers vous sous 48 h pour votre devis.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] md:p-11">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
          <span className="h-px w-24 bg-[linear-gradient(90deg,var(--gold),transparent)]" />
        </div>
        <h1 className="text-center font-display text-4xl font-semibold">Demander un devis</h1>
        <p className="mx-auto mb-8 mt-2 max-w-md text-center text-sm text-[var(--muted)]">
          Dites-nous tout sur votre événement — nous revenons vers vous sous 48 h.
        </p>

        {erreur && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Type d&apos;événement</label>
              <select className="se-input" value={form.typeEvenement} onChange={(e) => maj("typeEvenement", e.target.value)}>
                <option>Mariage</option><option>Anniversaire</option><option>Baptême</option>
                <option>Séminaire</option><option>Cocktail</option><option>Réception</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Date souhaitée</label>
              <input type="date" className="se-input" value={form.dateEvenement} onChange={(e) => maj("dateEvenement", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Nombre d&apos;invités</label>
              <input type="number" placeholder="ex. 150" className="se-input" value={form.nombreInvites} onChange={(e) => maj("nombreInvites", e.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Budget indicatif (FCFA)</label>
              <input type="text" placeholder="ex. 500 000" className="se-input" value={form.budgetIndicatif} onChange={(e) => maj("budgetIndicatif", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Prestations souhaitées</label>
            <div className="flex flex-wrap gap-3">
              {polesDispo.map((p) => (
                <label key={p.id} className={`flex flex-1 min-w-[140px] cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors ${poles.includes(p.id) ? "border-[var(--gold)] bg-[rgba(201,162,39,0.10)]" : "border-[var(--border)] bg-[var(--bg)]"}`}>
                  <input type="checkbox" checked={poles.includes(p.id)} onChange={() => togglePole(p.id)} className="h-4 w-4 accent-[var(--gold)]" />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Votre nom</label>
              <input type="text" placeholder="Nom & prénom" className="se-input" value={form.nomContact} onChange={(e) => maj("nomContact", e.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Téléphone / WhatsApp</label>
              <input type="tel" placeholder="+236 ..." className="se-input" value={form.telephone} onChange={(e) => maj("telephone", e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Précisions sur votre projet</label>
            <textarea rows={4} placeholder="Lieu, ambiance souhaitée, contraintes particulières..." className="se-input resize-y" value={form.message} onChange={(e) => maj("message", e.target.value)} />
          </div>

          <button type="submit" disabled={envoi} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-4 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:opacity-60">
            {envoi ? "Envoi en cours..." : <>Envoyer ma demande <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function DevisPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[var(--muted)]">Chargement…</div>}>
      <DevisForm />
    </Suspense>
  );
}