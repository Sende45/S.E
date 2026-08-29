"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2, KeyRound } from "lucide-react";

export default function ComptePage() {
  const [ancien, setAncien] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [confirme, setConfirme] = useState("");
  const [voir, setVoir] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState(false);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");
    setSucces(false);

    if (nouveau.length < 8) {
      setErreur("Le nouveau mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (nouveau !== confirme) {
      setErreur("Les deux nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setEnvoi(true);
    try {
      const res = await fetch("/api/compte/motdepasse", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ancienMotDePasse: ancien,
          nouveauMotDePasse: nouveau,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Échec de la mise à jour.");

      setSucces(true);
      setAncien("");
      setNouveau("");
      setConfirme("");
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl font-semibold">Mon compte</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Modifiez le mot de passe de connexion à l&apos;espace de gestion.
      </p>

      <form
        onSubmit={soumettre}
        className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6"
      >
        <div className="mb-5 flex items-center gap-2 text-[var(--gold)]">
          <KeyRound className="h-5 w-5" />
          <h2 className="font-display text-xl font-semibold">
            Changer le mot de passe
          </h2>
        </div>

        {succes && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#5fbf8f]/30 bg-[#5fbf8f]/10 p-3 text-sm text-[#5fbf8f]">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            Mot de passe mis à jour.
          </div>
        )}

        {erreur && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {erreur}
          </div>
        )}

        <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
          Mot de passe actuel
        </label>
        <input
          type={voir ? "text" : "password"}
          autoComplete="current-password"
          value={ancien}
          onChange={(e) => setAncien(e.target.value)}
          className="se-input mb-4"
          placeholder="••••••••"
          required
        />

        <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
          Nouveau mot de passe
        </label>
        <input
          type={voir ? "text" : "password"}
          autoComplete="new-password"
          value={nouveau}
          onChange={(e) => setNouveau(e.target.value)}
          className="se-input mb-1.5"
          placeholder="Au moins 8 caractères"
          required
        />
        <p className="mb-4 text-xs text-[var(--faint)]">
          Utilisez au moins 8 caractères, avec chiffres et lettres.
        </p>

        <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
          Confirmer le nouveau mot de passe
        </label>
        <input
          type={voir ? "text" : "password"}
          autoComplete="new-password"
          value={confirme}
          onChange={(e) => setConfirme(e.target.value)}
          className="se-input mb-4"
          placeholder="••••••••"
          required
        />

        <label className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]">
          <button
            type="button"
            onClick={() => setVoir((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-soft)] text-[var(--faint)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            aria-label={voir ? "Masquer" : "Afficher"}
          >
            {voir ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          Afficher les mots de passe
        </label>

        <button
          type="submit"
          disabled={envoi}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {envoi ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mise à jour...
            </>
          ) : (
            "Mettre à jour le mot de passe"
          )}
        </button>
      </form>
    </div>
  );
}