import Link from "next/link";
import { ShoppingCart, Wine, SprayCan, Store, ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const rayons = [
  {
    href: "/supermarche/alimentation",
    icon: ShoppingCart,
    titre: "Alimentation",
    desc: "Épicerie, boissons et essentiels du quotidien.",
  },
  {
    href: "/supermarche/liqueurs",
    icon: Wine,
    titre: "Liqueurs",
    desc: "Vins, spiritueux et boissons pour toutes vos occasions.",
  },
  {
    href: "/supermarche/hygiene",
    icon: SprayCan,
    titre: "Hygiène & Beauté",
    desc: "Déodorants, soins et produits d'hygiène.",
  },
  {
    href: "/supermarche/mini-shop",
    icon: Store,
    titre: "Mini Shop",
    desc: "Un peu de tout, à portée de main.",
  },
];

export default function SupermarchePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border-soft)]">
        <div className="pointer-events-none absolute right-[-20%] top-[-25%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10" />

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 md:pt-20">
          <BackButton fallbackHref="/" label="Retour à l'accueil" className="mb-6" />

          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
            Supermarché S.E · Bangui 8e
          </span>

          <Reveal>
            <h1 className="max-w-[18ch] font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Vos courses, <em className="italic text-[var(--gold)]">livrées</em> chez vous
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Achetez en boutique ou commandez en ligne : nous vous livrons partout
              dans le 8ᵉ arrondissement. Ouvert de 7h00 à 20h00.
            </p>
          </Reveal>
        </div>
      </section>

      {/* RAYONS */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rayons.map((r) => {
            const Icon = r.icon;
            return (
              <StaggerItem key={r.href}>
              <Link
                href={r.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />

                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="font-display text-xl font-semibold">{r.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {r.desc}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)]">
                  Voir le rayon
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>
    </>
  );
}