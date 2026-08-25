"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

// Numéro WhatsApp de S.E
const WHATSAPP = "23674017878";

export type Produit = {
  id: string;
  nom: string;
  cat: string;
  prix: number;

  // Image provenant de la base de données
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
  const { ajouter } = useCart();

  const liste =
    actif === "Tout"
      ? produits
      : produits.filter((p) => p.cat === actif);

  return (
    <>
      {/* Filtres */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["Tout", ...filtres].map((f) => (
          <button
            key={f}
            onClick={() => setActif(f)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              actif === f
                ? "border-transparent bg-[var(--gold)] text-[#3A1631]"
                : "border-[var(--border-soft)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Produits */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {liste.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.nom}
                  fill
                  sizes="(max-width:640px) 50vw,
                         (max-width:1024px) 33vw,
                         25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="grid h-full w-full place-items-center text-4xl sm:text-5xl"
                  style={{
                    background: `linear-gradient(135deg,${
                      p.from ?? "#6b2a4e"
                    },${p.to ?? "#3a1631"})`,
                  }}
                >
                  {p.emoji}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              {p.nouveaute && (
                <span className="absolute left-2 top-2 rounded-full bg-[var(--gold)] px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-[#3A1631] shadow">
                  Nouveau
                </span>
              )}

              <button className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-3 sm:p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                {p.cat}
              </div>

              <h3 className="mt-1 line-clamp-2 font-display text-base sm:text-lg font-semibold">
                {p.nom}
              </h3>

              <div className="mt-2 text-sm sm:text-base font-bold">
                {p.prix.toLocaleString("fr-FR")}{" "}
                <span className="text-xs font-medium text-[var(--faint)]">
                  FCFA
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    ajouter({
                      id: p.id,
                      nom: p.nom,
                      prix: p.prix,
                      image: p.image,
                      cat: p.cat,
                    })
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#3A1631] transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Ajouter</span>
                </button>

                <button
                  onClick={() => commanderWhatsApp(p)}
                  aria-label="Commander sur WhatsApp"
                  title="Commander sur WhatsApp"
                  className="grid w-10 flex-shrink-0 place-items-center rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}