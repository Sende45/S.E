export default function ShopHeader({
  titre,
  intro,
}: {
  titre: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-12%] top-[-20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10" />
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-8">
        <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
          Boutique S.E · Mode
        </span>
        <h1 className="font-display text-4xl font-semibold md:text-6xl">{titre}</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
          {intro}
        </p>
      </div>
    </section>
  );
}