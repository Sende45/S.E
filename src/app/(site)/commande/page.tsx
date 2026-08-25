"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/lib/cart";

const PAIEMENTS = [
  { id: "LIVRAISON", label: "Paiement à la livraison" },
  { id: "MOBILE_MONEY", label: "Mobile Money" },
  { id: "ESPECES", label: "Espèces / en boutique" },
];

export default function CommandePage() {
  const { items, total, changerQuantite, retirer, vider } = useCart();

  const [form, setForm] = useState({
    nomClient: "",
    telephone: "",
    email: "",
    adresse: "",
    note: "",
    methodePaiement: "LIVRAISON",
  });
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState<{ numero: string } | null>(null);

  const maj = (champ: string, valeur: string) =>
    setForm((f) => ({ ...f, [champ]: valeur }));

  const soumettre = async () => {
    setErreur("");
    if (!form.nomClient.trim() || !form.telephone.trim()) {
      setErreur("Le nom et le téléphone sont obligatoires.");
      return;
    }
    if (items.length === 0) {
      setErreur("Votre panier est vide.");
      return;
    }

    setEnvoi(true);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            produitId: i.id,
            nom: i.nom,
            prix: i.prix,
            quantite: i.quantite,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'envoi.");
      vider();
      setSucces({ numero: data.numero });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setEnvoi(false);
    }
  };

  // ---------- Écran de confirmation ----------
  if (succes) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <CheckCircle2 className="h-16 w-16 text-[#5fbf8f]" />
        <h1 className="mt-6 font-display text-3xl font-semibold">
          Commande envoyée !
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Merci pour votre confiance. Votre commande{" "}
          <span className="font-semibold text-[var(--gold)]">
            {succes.numero}
          </span>{" "}
          a bien été reçue. Notre équipe vous contactera très vite pour
          confirmer les détails.
        </p>
        <Link
          href="/boutique"
          className="mt-8 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5"
        >
          Retour à la boutique
        </Link>
      </section>
    );
  }

  // ---------- Panier vide ----------
  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <ShoppingBag className="h-14 w-14 text-[var(--faint)]" />
        <h1 className="mt-6 font-display text-3xl font-semibold">
          Votre panier est vide
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Ajoutez des articles depuis la boutique pour passer commande.
        </p>
        <Link
          href="/boutique"
          className="mt-8 rounded-lg border border-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[#3A1631]"
        >
          Découvrir la boutique
        </Link>
      </section>
    );
  }

  // ---------- Formulaire de commande ----------
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 md:py-14">
      <Link
        href="/boutique"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--gold)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Continuer mes achats
      </Link>

      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Finaliser ma commande
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* ---- Formulaire client ---- */}
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6">
            <h2 className="font-display text-xl font-semibold">
              Vos coordonnées
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
                  Nom complet *
                </label>
                <input
                  className="se-input"
                  placeholder="Votre nom et prénom"
                  value={form.nomClient}
                  onChange={(e) => maj("nomClient", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
                  Téléphone *
                </label>
                <input
                  className="se-input"
                  placeholder="+236 ..."
                  value={form.telephone}
                  onChange={(e) => maj("telephone", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
                  Email (facultatif)
                </label>
                <input
                  className="se-input"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => maj("email", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
                  Adresse de livraison
                </label>
                <input
                  className="se-input"
                  placeholder="Quartier, ville, point de repère..."
                  value={form.adresse}
                  onChange={(e) => maj("adresse", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
                  Note (facultatif)
                </label>
                <textarea
                  className="se-input"
                  rows={3}
                  placeholder="Taille, couleur, précisions..."
                  value={form.note}
                  onChange={(e) => maj("note", e.target.value)}
                />
              </div>
            </div>

            {/* Mode de paiement */}
            <h2 className="mt-8 font-display text-xl font-semibold">
              Mode de paiement
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAIEMENTS.map((p) => {
                const actif = form.methodePaiement === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => maj("methodePaiement", p.id)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      actif
                        ? "border-[var(--gold)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]"
                        : "border-[var(--border-soft)] text-[var(--muted)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {erreur && (
              <p className="mt-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {erreur}
              </p>
            )}

            <button
              onClick={soumettre}
              disabled={envoi}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {envoi ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>Confirmer la commande — {total.toLocaleString("fr-FR")} FCFA</>
              )}
            </button>
          </div>
        </div>

        {/* ---- Récapitulatif ---- */}
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold">
              Votre commande
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--bg)]">
                    {i.image ? (
                      <Image
                        src={i.image}
                        alt={i.nom}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xl">
                        🛍️
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-1 text-sm font-semibold">
                      {i.nom}
                    </span>
                    <span className="text-xs text-[var(--gold)]">
                      {i.prix.toLocaleString("fr-FR")} FCFA
                    </span>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-lg border border-[var(--border-soft)]">
                        <button
                          onClick={() => changerQuantite(i.id, i.quantite - 1)}
                          className="grid h-6 w-6 place-items-center text-[var(--muted)] transition hover:text-[var(--gold)]"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">
                          {i.quantite}
                        </span>
                        <button
                          onClick={() => changerQuantite(i.id, i.quantite + 1)}
                          className="grid h-6 w-6 place-items-center text-[var(--muted)] transition hover:text-[var(--gold)]"
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => retirer(i.id)}
                        className="grid h-6 w-6 place-items-center rounded text-red-400 transition hover:bg-red-500/10"
                        aria-label="Retirer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    {(i.prix * i.quantite).toLocaleString("fr-FR")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-[var(--border-soft)] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Total</span>
                <span className="font-display text-2xl font-semibold text-[var(--gold)]">
                  {total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--faint)]">
                Livraison et frais éventuels confirmés par notre équipe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}