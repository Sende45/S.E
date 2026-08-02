import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";
import { CategorieBoutique } from "@prisma/client";

export default async function AccessoiresPage() {
  const data = await prisma.produit.findMany({
    where: {
      categorie: CategorieBoutique.ACCESSOIRES,
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
    cat: p.sousCategorie ?? "Accessoires",
    prix: p.prix,
    image: p.photos[0],
    nouveaute: p.nouveaute,

    // Utilisés uniquement si aucune image n'est disponible
    emoji: "👜",
    from: "#6b2a4e",
    to: "#3a1631",
  }));

  return (
    <>
      <ShopHeader
        titre="Accessoires"
        intro="Sacs, bijoux, foulards et montres pour parfaire chaque tenue."
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid
          produits={produits}
          filtres={["Sacs", "Bijoux", "Foulards", "Montres"]}
        />
      </section>
    </>
  );
}