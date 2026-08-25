"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartButton() {
  const { nbArticles, ouvrir } = useCart();

  return (
    <button
      onClick={ouvrir}
      aria-label="Panier"
      className="relative grid h-10 w-10 place-items-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      <ShoppingBag className="h-5 w-5" />
      {nbArticles > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-bold text-[#3A1631]">
          {nbArticles}
        </span>
      )}
    </button>
  );
}