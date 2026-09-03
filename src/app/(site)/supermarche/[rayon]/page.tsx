import { notFound } from "next/navigation";
import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";
import { RayonSupermarche } from "@prisma/client";

// Correspondance slug d'URL → rayon en base + textes d'en-tête
const RAYONS: Record<
  string,
  { rayon: RayonSupermarche; titre: string; intro: string; emoji: string }
> = {
  alimentation: {
    rayon: "ALIMENTATION",
    titre: "Alimentation",
    intro: "Épicerie, boissons et essentiels du quotidien.",
    emoji: "🛒",
  },
  liqueurs: {
    rayon: "LIQUEURS",
    titre: "Liqueurs",
    intro: "Vins, spiritueux et boissons pour toutes vos occasions.",
    emoji: "🍷",
  },
  hygiene: {
    rayon: "HYGIENE",
    titre: "Hygiène & Beauté",
    intro: "Déodorants, soins et produits d'hygiène.",
    emoji: "🧴",
  },
  "mini-shop": {
    rayon: "MINISHOP",
    titre: "Mini Shop",
    intro: "Un peu de tout, à portée de main.",
    emoji: "🏪",
  },
};

// Rafraîchit le contenu venant du backoffice sans redéploiement
export const revalidate = 60;

export default async function RayonPage({
  params,
}: {
  params: Promise<{ rayon: string }>;
}) {
  const { rayon: slug } = await params;
  const config = RAYONS[slug];
  if (!config) notFound();

  const data = await prisma.produit.findMany({
    where: {
      univers: "SUPERMARCHE",
      rayon: config.rayon,
      actif: true,
      disponible: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const produits: Produit[] = data.map((p) => ({
    id: p.id,
    nom: p.nom,
    cat: p.sousCategorie ?? config.titre,
    prix: p.prix,
    nouveaute: p.nouveaute,
    image: p.photos[0],
    emoji: config.emoji,
    from: "#1c3d2f",
    to: "#0f2119",
  }));

  return (
    <>
      <ShopHeader titre={config.titre} intro={config.intro} />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid produits={produits} filtres={[]} />
      </section>
    </>
  );
}