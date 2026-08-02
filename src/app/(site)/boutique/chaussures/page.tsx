import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";
import { CategorieBoutique } from "@prisma/client";

export default async function ChaussuresPage() {
  const data = await prisma.produit.findMany({
    where: {
      categorie: CategorieBoutique.CHAUSSURES,
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
    cat: p.sousCategorie ?? "Chaussures",
    prix: p.prix,
    image: p.photos[0],
    nouveaute: p.nouveaute,

    // Utilisés uniquement si aucune image n'est disponible
    emoji: "👞",
    from: "#8a5a2a",
    to: "#4a1d3f",
  }));

  return (
    <>
      <ShopHeader
        titre="Chaussures"
        intro="Escarpins, mocassins, sandales de cérémonie — le détail qui fait la tenue."
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