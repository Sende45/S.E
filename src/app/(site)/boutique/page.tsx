import Link from "next/link";
import { Shirt, Footprints, Gem, ArrowRight } from "lucide-react";

const rayons = [
  {
    href: "/boutique/vetements",
    icon: Shirt,
    titre: "Vêtements",
    desc: "Robes, ensembles, costumes — du quotidien à la grande soirée.",
  },
  {
    href: "/boutique/chaussures",
    icon: Footprints,
    titre: "Chaussures",
    desc: "Escarpins, mocassins et sandales de cérémonie.",
  },
  {
    href: "/boutique/accessoires",
    icon: Gem,
    titre: "Accessoires",
    desc: "Sacs, bijoux, foulards et montres pour parfaire chaque tenue.",
  },
];

export default function BoutiquePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-12%] top-[-20%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10 md:h-[400px] md:w-[400px]" />

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 md:pt-20">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
            Boutique S.E · Mode
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Nos boutiques
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Une sélection élégante pour toutes vos occasions : vêtements,
            chaussures et accessoires soigneusement sélectionnés.
          </p>
        </div>
      </section>

      {/* RAYONS */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rayons.map((r) => {
            const Icon = r.icon;

            return (
              <Link
                key={r.href}
                href={r.href}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--gold)] md:p-8"
              >
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>

                <h2 className="font-display text-2xl font-semibold">
                  {r.titre}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {r.desc}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--gold)] transition-transform group-hover:translate-x-1">
                  Explorer
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}