import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BackButton from "@/components/BackButton";
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

// Rafraîchit le contenu venant du backoffice sans redéploiement
export const revalidate = 60;

export default async function TraiteurPage() {
  const galerie = await prisma.realisation.findMany({
    where: {
      categorie: "TRAITEUR",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-12%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-10" />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
          {/* Bouton retour */}
          <BackButton
            fallbackHref="/"
            label="Retour à l'accueil"
            className="mb-6"
          />

          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--gold)]" />
            Pôle gastronomie
          </span>

          <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.03] md:text-6xl">
            Le service{" "}
            <em className="italic text-[var(--gold)]">traiteur</em> des grands
            événements
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
        {galerie.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galerie.map((g, index) => (
              <div
                key={g.id}
                className={`relative overflow-hidden rounded-2xl border border-[var(--border-soft)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
                style={{
                  aspectRatio: index === 0 ? "auto" : "3 / 4",
                  minHeight: index === 0 ? "260px" : undefined,
                }}
              >
                <Image
                  src={g.imageUrl}
                  alt={g.titre ?? "Réalisation"}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                    {g.categorie}
                  </p>

                  {g.titre && (
                    <h3 className="font-display text-xl font-semibold text-white">
                      {g.titre}
                    </h3>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-soft)] p-12 text-center text-[var(--muted)]">
            Aucune réalisation disponible pour le moment.
          </div>
        )}
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

                <h3 className="font-display text-2xl font-semibold">
                  {p.titre}
                </h3>

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
            Demander un devis traiteur
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}