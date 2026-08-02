"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Connexion impossible");
      }
      router.push("/dashboard");
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-lg font-bold text-[var(--gold)]">
            S.E
          </span>
          <h1 className="font-display text-3xl font-semibold">Espace S.E</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Connexion à la gestion</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]"
        >
          {erreur && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {erreur}
            </div>
          )}

          <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Email</label>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="se-input pl-10"
              placeholder="admin@se-holding.com"
              required
            />
          </div>

          <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Mot de passe</label>
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--faint)]" />
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="se-input pl-10"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3.5 text-sm font-bold text-[#3A1631] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {chargement ? "Connexion..." : <>Se connecter <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}