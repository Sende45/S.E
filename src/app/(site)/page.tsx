import Link from "next/link";
import {
  UtensilsCrossed,
  Sparkles,
  PartyPopper,
  Shirt,
  Footprints,
  Gem,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

const univers = [
  {
    href: "/traiteur",
    icon: UtensilsCrossed,
    titre: "Service traiteur",
    desc: "Buffets, plats servis, cocktails et pâtisserie pour vos grands événements.",
    type: "service",
  },
  {
    href: "/decoration",
    icon: Sparkles,
    titre: "Décoration",
    desc: "Scénographie élégante : arches florales, dressage de tables, mise en lumière.",
    type: "service",
  },
  {
    href: "/evenementiel",
    icon: PartyPopper,
    titre: "Événementiel",
    desc: "Coordination complète du jour J : logistique, personnel, timing.",
    type: "service",
  },
  {
    href: "/boutique/vetements",
    icon: Shirt,
    titre: "Vêtements",
    desc: "Une sélection élégante, du quotidien à la grande soirée.",
    type: "boutique",
  },
  {
    href: "/boutique/chaussures",
    icon: Footprints,
    titre: "Chaussures",
    desc: "Escarpins, mocassins et sandales de cérémonie.",
    type: "boutique",
  },
  {
    href: "/boutique/accessoires",
    icon: Gem,
    titre: "Accessoires",
    desc: "Sacs, bijoux, foulards et montres pour parfaire chaque tenue.",
    type: "boutique",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
            L&apos;excellence S.E
          </span>
          <h1 className="max-w-[15ch] font-display text-5xl font-semibold leading-[1.03] md:text-7xl">
            Le service de la <em className="italic text-[var(--gold)]">qualité</em> et des saveurs
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
            Traiteur, décoration, événementiel et boutiques mode — S.E Holding
            réunit tous les métiers de la réception d&apos;exception en République
            Centrafricaine.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[#3A1631]"
            >
              Visiter la boutique
            </Link>
          </div>
        </div>
      </section>

      {/* UNIVERS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            Nos univers
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold">
            Six métiers, une même exigence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {univers.map((u) => {
            const Icon = u.icon;
            return (
              <Link
                key={u.href}
                href={u.href}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 transition-transform hover:-translate-y-1.5"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)]">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  {u.type === "boutique" ? "Boutique" : "Service"}
                </div>
                <h3 className="font-display text-2xl font-semibold">{u.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {u.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold)]">
                  Découvrir <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[var(--bg-2)] py-16 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
          <h2 className="mt-4 font-display text-4xl font-semibold">
            Parlons de votre projet
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Une équipe à votre écoute pour vos plus beaux événements.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-8">
            <a
              href="tel:+23675437878"
              className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--gold)]"
            >
              <Phone className="h-5 w-5" /> 75 43 78 78
            </a>
            <a
              href="https://wa.me/23674017878"
              className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--gold)]"
            >
              <MessageCircle className="h-5 w-5" /> 74 01 78 78
            </a>
          </div>
        </div>
      </section>
    </>
  );
}