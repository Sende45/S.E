import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";
import { CategorieBoutique } from "@prisma/client";

// Rafraîchit le contenu venant du backoffice sans redéploiement
export const revalidate = 60;

export default async function VetementsPage() {
  const data = await prisma.produit.findMany({
    where: {
      categorie: CategorieBoutique.VETEMENTS,
      actif: true,
      disponible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const produits: Produit[] = data.map((p) => ({
    id: p.id,
    nom: p.nom,
    cat: p.sousCategorie ?? "Vêtements",
    prix: p.prix,
    nouveaute: p.nouveaute,

    // Première photo du tableau photos[]
    image: p.photos[0],

    // Compatibilité avec ProductGrid
    emoji: "👗",
    from: "#6b2a4e",
    to: "#3a1631",
  }));

  return (
    <>
      <ShopHeader
        titre="Vêtements"
        intro="Une sélection élégante pour toutes vos occasions — du quotidien à la grande soirée."
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid
          produits={produits}
          filtres={["Femme", "Homme", "Cérémonie"]}
        />
      </section>
    </>
  );
}