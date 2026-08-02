import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";

const produits: Produit[] = [
  { id: "c1", nom: "Escarpins vernis", cat: "Femme", prix: 32000, emoji: "👠", from: "#6b2a4e", to: "#3a1631", nouveaute: true },
  { id: "c2", nom: "Mocassins cuir", cat: "Homme", prix: 40000, emoji: "👞", from: "#8a5a2a", to: "#4a1d3f" },
  { id: "c3", nom: "Sandales dorées", cat: "Cérémonie", prix: 28000, emoji: "🩴", from: "#7a4a6b", to: "#34122c" },
  { id: "c4", nom: "Baskets premium", cat: "Homme", prix: 35000, emoji: "👟", from: "#5b2a4e", to: "#2a0f24" },
];

export default function ChaussuresPage() {
  return (
    <>
      <ShopHeader
        titre="Chaussures"
        intro="Escarpins, mocassins, sandales de cérémonie — le détail qui fait la tenue."
      />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid produits={produits} filtres={["Femme", "Homme", "Cérémonie"]} />
      </section>
    </>
  );
}