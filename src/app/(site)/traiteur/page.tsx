import Link from "next/link";
import {
  UtensilsCrossed,
  ChefHat,
  Cake,
  ArrowRight,
} from "lucide-react";

const prestations = [
  {
    icon: UtensilsCrossed,
    titre: "Buffets & cocktails",
    desc: "Formules pour 20 à 500 convives : entrées, plats chauds, desserts et boissons.",
  },
  {
    icon: ChefHat,
    titre: "Chef à domicile",
    desc: "Un chef et sa brigade se déplacent pour un service sur-mesure chez vous.",
  },
  {
    icon: Cake,
    titre: "Pâtisserie événement",
    desc: "Pièces montées, gâteaux de mariage et mignardises réalisés sur commande.",
  },
];

const galerie = [
  { titre: "Buffets de réception", from: "#6b2a4e", to: "#3a1631", big: true },
  { titre: "Plats servis", from: "#8a5a2a", to: "#4a1d3f", big: false },
  { titre: "Pâtisserie", from: "#7a4a6b", to: "#34122c", big: false },
];

export default function TraiteurPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-12%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10" />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
            Pôle gastronomie
          </span>
          <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.03] md:text-6xl">
            Le service <em className="italic text-[var(--gold)]">traiteur</em> des grands événements
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--muted)]">
            Une cuisine généreuse et raffinée, pensée pour marquer les esprits :
            buffets d&apos;exception, plats servis à l&apos;assiette, cocktails
            dînatoires et pâtisserie maison, partout en Centrafrique.
          </p>
        </div>
      </section>

      {/* GALERIE */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {galerie.map((g) => (
            <div
              key={g.titre}
              className={`relative flex items-end overflow-hidden rounded-2xl border border-[var(--border-soft)] p-4 ${
                g.big ? "col-span-2" : ""
              }`}
              style={{
                aspectRatio: g.big ? "auto" : "3 / 4",
                minHeight: g.big ? "260px" : undefined,
                background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
              }}
            >
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,8,18,0.75),transparent_60%)]" />
              <span className="relative z-10 font-display text-lg font-semibold text-white">
                {g.titre}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRESTATIONS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center gap-4">
          <h2 className="whitespace-nowrap font-display text-3xl font-semibold">
            Nos prestations
          </h2>
          <span className="h-px flex-1 bg-[linear-gradient(90deg,var(--gold),transparent)]" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {prestations.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.titre}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-7 transition-transform hover:-translate-y-1.5"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl font-semibold">{p.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg-2)] py-14 text-center">
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
        <h2 className="mt-4 font-display text-3xl font-semibold">
          Un repas à composer ?
        </h2>
        <div className="mt-6">
          <Link
            href="/devis?pole=traiteur"
            className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5"
          >
            Demander un devis traiteur <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}