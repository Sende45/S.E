"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

// Numéro WhatsApp de S.E
const WHATSAPP = "23674017878";

export type Produit = {
  id: string;
  nom: string;
  cat: string;
  prix: number;

  // Nouvelle propriété
  image?: string;

  // Compatibilité avec les anciens produits
  emoji?: string;
  from?: string;
  to?: string;

  nouveaute?: boolean;
};

function commanderWhatsApp(p: Produit) {
  const texte = encodeURIComponent(
    `Bonjour S.E, je suis intéressé(e) par « ${p.nom} » (${p.prix.toLocaleString(
      "fr-FR"
    )} FCFA). Est-il disponible ?`
  );

  window.open(`https://wa.me/${WHATSAPP}?text=${texte}`, "_blank");
}

export default function ProductGrid({
  produits,
  filtres,
}: {
  produits: Produit[];
  filtres: string[];
}) {
  const [actif, setActif] = useState("Tout");

  const liste =
    actif === "Tout"
      ? produits
      : produits.filter((p) => p.cat === actif);

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2.5">
        {["Tout", ...filtres].map((f) => (
          <button
            key={f}
            onClick={() => setActif(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              actif === f
                ? "border-transparent bg-[var(--gold)] text-[#3A1631]"
                : "border-[var(--border-soft)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--gold)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {liste.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] transition-transform hover:-translate-y-1.5"
          >
            <div className="relative aspect-square overflow-hidden">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.nom}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="grid h-full w-full place-items-center text-5xl"
                  style={{
                    background: `linear-gradient(135deg, ${
                      p.from ?? "#6b2a4e"
                    }, ${p.to ?? "#3a1631"})`,
                  }}
                >
                  {p.emoji}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {p.nouveaute && (
                <span className="absolute left-3 top-3 rounded-full bg-[var(--gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#3A1631]">
                  Nouveau
                </span>
              )}

              <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                {p.cat}
              </div>

              <h3 className="mt-1 font-display text-lg font-semibold">
                {p.nom}
              </h3>

              <div className="mt-2 text-sm font-bold">
                {p.prix.toLocaleString("fr-FR")}{" "}
                <span className="text-xs font-medium text-[var(--faint)]">
                  FCFA
                </span>
              </div>

              <button
                onClick={() => commanderWhatsApp(p)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 py-2.5 text-xs font-bold uppercase tracking-wide text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Commander sur WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}