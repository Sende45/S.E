"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  fallbackHref = "/",
  label = "Retour",
  className = "",
}: {
  fallbackHref?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const retour = () => {
    // S'il y a un historique, on revient à la page précédente ;
    // sinon (accès direct au lien) on va vers la page de repli.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={retour}
      className={`inline-flex items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] px-3.5 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}