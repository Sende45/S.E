"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  KeyRound,
  AtSign,
} from "lucide-react";

export default function ComptePage() {
  // ----- Email -----
  const [email, setEmail] = useState("");
  const [emailMdp, setEmailMdp] = useState("");
  const [emailEnvoi, setEmailEnvoi] = useState(false);
  const [emailErreur, setEmailErreur] = useState("");
  const [emailSucces, setEmailSucces] = useState(false);
  const [chargementInfos, setChargementInfos] = useState(true);

  // ----- Mot de passe -----
  const [ancien, setAncien] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [confirme, setConfirme] = useState("");
  const [voir, setVoir] = useState(false);
  const [mdpEnvoi, setMdpEnvoi] = useState(false);
  const [mdpErreur, setMdpErreur] = useState("");
  const [mdpSucces, setMdpSucces] = useState(false);

  // Récupère l'email actuel
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/compte");
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email ?? "");
        }
      } finally {
        setChargementInfos(false);
      }
    })();
  }, []);

  const changerEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErreur("");
    setEmailSucces(false);
    setEmailEnvoi(true);
    try {
      const res = await fetch("/api/compte/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nouveauEmail: email, motDePasse: emailMdp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Échec de la mise à jour.");
      setEmailSucces(true);
      setEmailMdp("");
    } catch (err) {
      setEmailErreur(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setEmailEnvoi(false);
    }
  };

  const changerMdp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMdpErreur("");
    setMdpSucces(false);

    if (nouveau.length < 8) {
      setMdpErreur("Le nouveau mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (nouveau !== confirme) {
      setMdpErreur("Les deux nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setMdpEnvoi(true);
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
      setMdpSucces(true);
      setAncien("");
      setNouveau("");
      setConfirme("");
    } catch (err) {
      setMdpErreur(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setMdpEnvoi(false);
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Mon compte</h1>
        <p className="text-sm text-[var(--muted)]">
          Gérez votre identifiant et votre mot de passe de connexion.
        </p>
      </div>

      {/* ===== Email ===== */}
      <form
        onSubmit={changerEmail}
        className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6"
      >
        <div className="mb-5 flex items-center gap-2 text-[var(--gold)]">
          <AtSign className="h-5 w-5" />
          <h2 className="font-display text-xl font-semibold">
            Email de connexion
          </h2>
        </div>

        {emailSucces && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#5fbf8f]/30 bg-[#5fbf8f]/10 p-3 text-sm text-[#5fbf8f]">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            Email mis à jour.
          </div>
        )}
        {emailErreur && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {emailErreur}
          </div>
        )}

        <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
          Nouvel email
        </label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="se-input mb-4"
          placeholder={chargementInfos ? "Chargement..." : "vous@exemple.com"}
          disabled={chargementInfos}
          required
        />

        <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
          Mot de passe actuel (pour confirmer)
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={emailMdp}
          onChange={(e) => setEmailMdp(e.target.value)}
          className="se-input mb-5"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={emailEnvoi || chargementInfos}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {emailEnvoi ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mise à jour...
            </>
          ) : (
            "Mettre à jour l'email"
          )}
        </button>
      </form>

      {/* ===== Mot de passe ===== */}
      <form
        onSubmit={changerMdp}
        className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6"
      >
        <div className="mb-5 flex items-center gap-2 text-[var(--gold)]">
          <KeyRound className="h-5 w-5" />
          <h2 className="font-display text-xl font-semibold">Mot de passe</h2>
        </div>

        {mdpSucces && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#5fbf8f]/30 bg-[#5fbf8f]/10 p-3 text-sm text-[#5fbf8f]">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            Mot de passe mis à jour.
          </div>
        )}
        {mdpErreur && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {mdpErreur}
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
          disabled={mdpEnvoi}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mdpEnvoi ? (
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