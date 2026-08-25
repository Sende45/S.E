"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Package,
  Phone,
  MapPin,
  CreditCard,
  ChevronDown,
} from "lucide-react";

type Ligne = {
  id: string;
  nomProduit: string;
  prixUnitaire: number;
  quantite: number;
};

type Commande = {
  id: string;
  numero: string;
  nomClient: string;
  telephone: string;
  email: string | null;
  adresse: string | null;
  note: string | null;
  methodePaiement: string;
  statut: string;
  total: number;
  createdAt: string;
  lignes: Ligne[];
};

const STATUTS = [
  { id: "NOUVELLE", label: "Nouvelle" },
  { id: "CONFIRMEE", label: "Confirmée" },
  { id: "EN_PREPARATION", label: "En préparation" },
  { id: "EXPEDIEE", label: "Expédiée" },
  { id: "LIVREE", label: "Livrée" },
  { id: "ANNULEE", label: "Annulée" },
];

const PAIEMENT_LABEL: Record<string, string> = {
  LIVRAISON: "Paiement à la livraison",
  MOBILE_MONEY: "Mobile Money",
  ESPECES: "Espèces / en boutique",
};

const statutPill: Record<string, string> = {
  NOUVELLE: "bg-[rgba(228,190,85,0.15)] text-[var(--gold)]",
  CONFIRMEE: "bg-[rgba(96,165,250,0.16)] text-[#7fb0f5]",
  EN_PREPARATION: "bg-[rgba(180,140,255,0.16)] text-[#c3a2ff]",
  EXPEDIEE: "bg-[rgba(120,120,140,0.18)] text-[var(--muted)]",
  LIVREE: "bg-[rgba(76,175,127,0.16)] text-[#5fbf8f]",
  ANNULEE: "bg-red-500/15 text-red-400",
};

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [chargement, setChargement] = useState(true);
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [majEnCours, setMajEnCours] = useState<string | null>(null);

  const charger = async () => {
    const res = await fetch("/api/commandes");
    if (res.ok) setCommandes(await res.json());
    setChargement(false);
  };

  useEffect(() => {
    charger();
  }, []);

  const changerStatut = async (id: string, statut: string) => {
    setMajEnCours(id);
    // Mise à jour optimiste
    setCommandes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, statut } : c))
    );
    try {
      await fetch(`/api/commandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
    } finally {
      setMajEnCours(null);
    }
  };

  if (chargement) {
    return (
      <div className="flex h-64 items-center justify-center text-[var(--muted)]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Commandes</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Les commandes passées depuis la boutique en ligne.
      </p>

      {commandes.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <Package className="mx-auto h-10 w-10 text-[var(--faint)]" />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Aucune commande pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {commandes.map((c) => {
            const estOuvert = ouvert === c.id;
            return (
              <div
                key={c.id}
                className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)]"
              >
                {/* En-tête cliquable */}
                <button
                  onClick={() => setOuvert(estOuvert ? null : c.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[var(--bg-2)]"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg font-semibold">
                        {c.nomClient}
                      </span>
                      <span className="text-xs text-[var(--faint)]">
                        {c.numero}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">
                      {c.lignes.reduce((n, l) => n + l.quantite, 0)} article(s) ·{" "}
                      {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statutPill[c.statut] ?? ""
                    }`}
                  >
                    {STATUTS.find((s) => s.id === c.statut)?.label ?? c.statut}
                  </span>

                  <span className="hidden font-semibold sm:block">
                    {c.total.toLocaleString("fr-FR")} FCFA
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform ${
                      estOuvert ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Détail */}
                {estOuvert && (
                  <div className="border-t border-[var(--border-soft)] px-5 py-4">
                    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
                      {/* Articles */}
                      <div>
                        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--faint)]">
                          Articles
                        </h3>
                        <div className="space-y-2">
                          {c.lignes.map((l) => (
                            <div
                              key={l.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>
                                <span className="font-semibold">
                                  {l.quantite}×
                                </span>{" "}
                                {l.nomProduit}
                              </span>
                              <span className="text-[var(--muted)]">
                                {(l.prixUnitaire * l.quantite).toLocaleString(
                                  "fr-FR"
                                )}{" "}
                                FCFA
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-[var(--border-soft)] pt-3 text-sm font-bold">
                          <span>Total</span>
                          <span className="text-[var(--gold)]">
                            {c.total.toLocaleString("fr-FR")} FCFA
                          </span>
                        </div>

                        {c.note && (
                          <p className="mt-3 rounded-lg bg-[var(--bg-2)] px-3 py-2 text-xs text-[var(--muted)]">
                            <span className="font-semibold">Note :</span>{" "}
                            {c.note}
                          </p>
                        )}
                      </div>

                      {/* Coordonnées + statut */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-[var(--muted)]">
                          <Phone className="h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                          <a
                            href={`tel:${c.telephone}`}
                            className="hover:text-[var(--gold)]"
                          >
                            {c.telephone}
                          </a>
                        </div>
                        {c.adresse && (
                          <div className="flex items-start gap-2 text-[var(--muted)]">
                            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                            <span>{c.adresse}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[var(--muted)]">
                          <CreditCard className="h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                          <span>
                            {PAIEMENT_LABEL[c.methodePaiement] ??
                              c.methodePaiement}
                          </span>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--faint)]">
                            Statut
                          </label>
                          <div className="relative">
                            <select
                              value={c.statut}
                              onChange={(e) =>
                                changerStatut(c.id, e.target.value)
                              }
                              disabled={majEnCours === c.id}
                              className="se-input appearance-none pr-9"
                            >
                              {STATUTS.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                            {majEnCours === c.id ? (
                              <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[var(--muted)]" />
                            ) : (
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}