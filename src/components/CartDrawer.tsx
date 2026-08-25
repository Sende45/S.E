"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const {
    items,
    ouvert,
    fermer,
    changerQuantite,
    retirer,
    total,
    nbArticles,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={fermer}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          ouvert ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panneau */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-[var(--border-soft)] bg-[var(--bg-2)] shadow-2xl transition-transform duration-300 ${
          ouvert ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!ouvert}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[var(--gold)]" />
            <h2 className="font-display text-xl font-semibold">
              Mon panier
              {nbArticles > 0 && (
                <span className="ml-2 text-sm text-[var(--muted)]">
                  ({nbArticles})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={fermer}
            aria-label="Fermer le panier"
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-soft)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenu */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-[var(--faint)]" />
            <p className="text-[var(--muted)]">Votre panier est vide.</p>
            <Link
              href="/boutique"
              onClick={fermer}
              className="mt-2 rounded-lg border border-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[#3A1631]"
            >
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] p-3"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--bg)]">
                    {i.image ? (
                      <Image
                        src={i.image}
                        alt={i.nom}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-2xl">
                        🛍️
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-semibold">
                      {i.nom}
                    </h3>
                    <div className="mt-0.5 text-sm font-bold text-[var(--gold)]">
                      {i.prix.toLocaleString("fr-FR")} FCFA
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-lg border border-[var(--border-soft)]">
                        <button
                          onClick={() => changerQuantite(i.id, i.quantite - 1)}
                          className="grid h-7 w-7 place-items-center text-[var(--muted)] transition hover:text-[var(--gold)]"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {i.quantite}
                        </span>
                        <button
                          onClick={() => changerQuantite(i.id, i.quantite + 1)}
                          className="grid h-7 w-7 place-items-center text-[var(--muted)] transition hover:text-[var(--gold)]"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => retirer(i.id)}
                        className="grid h-7 w-7 place-items-center rounded-lg text-red-400 transition hover:bg-red-500/10"
                        aria-label="Retirer l'article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pied */}
            <div className="border-t border-[var(--border-soft)] px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Total</span>
                <span className="font-display text-2xl font-semibold text-[var(--gold)]">
                  {total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <Link
                href="/commande"
                onClick={fermer}
                className="flex w-full items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] py-3 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5"
              >
                Passer la commande
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}