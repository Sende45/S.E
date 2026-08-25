import BackButton from "@/components/BackButton";

type ShopHeaderProps = {
  titre: string;
  intro: string;
};

export default function ShopHeader({
  titre,
  intro,
}: ShopHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Halo décoratif */}
      <div className="pointer-events-none absolute right-[-30%] top-[-20%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10 sm:right-[-18%] sm:h-[340px] sm:w-[340px] lg:right-[-12%] lg:h-[420px] lg:w-[420px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        {/* Bouton retour */}
        <BackButton
          fallbackHref="/boutique"
          label="Retour à la boutique"
          className="mb-6"
        />

        {/* Badge */}
        <span className="mb-4 inline-flex items-center gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--gold)]">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
          Boutique S.E · Mode
        </span>

        {/* Titre */}
        <h1 className="max-w-[16ch] font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          {titre}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--muted)]">
          {intro}
        </p>
      </div>
    </section>
  );
}