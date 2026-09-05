import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Float from "@/components/motion/Float";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
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
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10 sm:h-96 sm:w-96" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
          {/* Texte */}
          <div>
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-xs sm:tracking-[0.3em]">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
                L'excellence S.E
              </span>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                Un service de{" "}
                <em className="text-shimmer italic">qualité</em> et de saveurs
              </h1>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Traiteur, décoration, événementiel et boutiques mode — S.E Holding
                réunit tous les métiers de la réception d'exception en République
                Centrafricaine.
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/devis"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(122,46,102,0.25)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/boutique"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[#3A1631] sm:w-auto"
                >
                  Visiter la boutique
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal delay={0.15}>
            <Float amplitude={14} duration={7}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] shadow-[var(--shadow)]">
                <Image
                  src="https://res.cloudinary.com/lacnn0m0/image/upload/f_auto,q_auto,w_900/v1788439047/t%C3%A9l%C3%A9chargement.jpg"
                  alt="Une réalisation S.E Holding"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Float>
          </Reveal>
        </div>
      </section>

      {/* UNIVERS */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal className="mb-10 text-center lg:mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] sm:text-xs">
            Nos univers
          </span>

          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Six métiers, une même exigence
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {univers.map((u) => {
            const Icon = u.icon;

            return (
              <StaggerItem key={u.href}>
              <Link
                href={u.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)] lg:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />

                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.12)] text-[var(--gold)] lg:h-14 lg:w-14">
                  <Icon className="h-6 w-6" />
                </span>

                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                  {u.type === "boutique" ? "Boutique" : "Service"}
                </div>

                <h3 className="font-display text-xl font-semibold lg:text-2xl">
                  {u.titre}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {u.desc}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)]">
                  Découvrir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* CONTACT */}
      <section className="bg-[var(--bg-2)] py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />

          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Parlons de votre projet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Une équipe à votre écoute pour organiser vos plus beaux événements.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+23675437878"
              className="flex items-center justify-center gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-4 font-display text-lg font-semibold text-[var(--gold)] transition hover:border-[var(--gold)]"
            >
              <Phone className="h-5 w-5" />
              +23674 01 78 78
            </a>

            <a
              href="https://wa.me/23674017878"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-4 font-display text-lg font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
              +236 75 43 78 78
            </a>
          </div>
        </div>
      </section>
    </>
  );
}