"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [voirMdp, setVoirMdp] = useState(false);
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

      // Lecture robuste : ne plante pas si la réponse est vide
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || `Connexion impossible (code ${res.status})`
        );
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ===== Panneau maison (gauche, desktop) ===== */}
      <aside className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#2a0f24_0%,#421A38_55%,#34122C_100%)] lg:block">
        {/* Halos dorés */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-[0.12]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-[0.08]" />

        {/* Monogramme en filigrane */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[22rem] font-bold leading-none text-[var(--gold)] opacity-[0.04]">
          S.E
        </span>

        {/* Coins « carton d'invitation » */}
        <span className="absolute left-8 top-8 h-8 w-8 border-l border-t border-[var(--gold)]/40" />
        <span className="absolute right-8 top-8 h-8 w-8 border-r border-t border-[var(--gold)]/40" />
        <span className="absolute bottom-8 left-8 h-8 w-8 border-b border-l border-[var(--gold)]/40" />
        <span className="absolute bottom-8 right-8 h-8 w-8 border-b border-r border-[var(--gold)]/40" />

        {/* Contenu */}
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-sm font-bold text-[var(--gold)]">
              S.E
            </span>
            <span className="font-display text-xl font-bold tracking-wide">
              S.E<span className="text-[var(--gold)]">·</span>HOLDING
            </span>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
              Espace de gestion
            </p>
            <h2 className="max-w-md font-display text-5xl font-semibold leading-[1.05] xl:text-6xl">
              L'excellence,
              <br />
              côté <em className="italic text-[var(--gold)]">coulisses</em>.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Commandes, demandes de devis et boutique de la maison — le tout
              piloté depuis un seul endroit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--faint)]">
            <span>Traiteur</span>
            <span className="text-[var(--gold)]">·</span>
            <span>Décoration</span>
            <span className="text-[var(--gold)]">·</span>
            <span>Événementiel</span>
            <span className="text-[var(--gold)]">·</span>
            <span>Boutique</span>
          </div>
        </div>
      </aside>

      {/* ===== Formulaire (droite) ===== */}
      <main className="relative flex flex-col bg-[var(--bg-2)] px-6 py-8 sm:px-10">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--gold)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm py-10">
            {/* En-tête */}
            <div className="mb-8 text-center lg:text-left">
              <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-lg font-bold text-[var(--gold)] lg:hidden">
                S.E
              </span>
              <h1 className="font-display text-4xl font-semibold">Bienvenue</h1>
              <p className="mt-1.5 text-sm text-[var(--muted)]">
                Connectez-vous à votre espace de gestion.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {erreur && (
                <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {erreur}
                </div>
              )}

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[var(--muted)]"
              >
                Email
              </label>
              <div className="relative mb-4">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="se-input"
                  placeholder="vous@se-holding.com"
                  required
                />
              </div>

              <label
                htmlFor="motdepasse"
                className="mb-2 block text-sm font-semibold text-[var(--muted)]"
              >
                Mot de passe
              </label>
              <div className="relative mb-6">
                <input
                  id="motdepasse"
                  type={voirMdp ? "text" : "password"}
                  autoComplete="current-password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="se-input pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVoirMdp((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--faint)] transition-colors hover:text-[var(--gold)]"
                  aria-label={
                    voirMdp ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                >
                  {voirMdp ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={chargement}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {chargement ? (
                  "Connexion..."
                ) : (
                  <>
                    Se connecter <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-[var(--faint)] lg:text-left">
              Accès réservé à l'équipe S.E Holding.
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-[var(--faint)] lg:text-left">
          © {new Date().getFullYear()} S.E Holding — Tous droits réservés.
        </p>
      </main>
    </div>
  );
}