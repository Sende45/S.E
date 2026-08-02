import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";

const produits: Produit[] = [
  { id: "a1", nom: "Pochette soirée", cat: "Sacs", prix: 18000, emoji: "👜", from: "#6b2a4e", to: "#3a1631", nouveaute: true },
  { id: "a2", nom: "Parure dorée", cat: "Bijoux", prix: 25000, emoji: "💍", from: "#8a5a2a", to: "#4a1d3f" },
  { id: "a3", nom: "Foulard en soie", cat: "Foulards", prix: 12000, emoji: "🧣", from: "#7a4a6b", to: "#34122c" },
  { id: "a4", nom: "Montre classique", cat: "Montres", prix: 48000, emoji: "⌚", from: "#5b2a4e", to: "#2a0f24", nouveaute: true },
];

export default function AccessoiresPage() {
  return (
    <>
      <ShopHeader
        titre="Accessoires"
        intro="Sacs, bijoux, foulards et montres pour parfaire chaque tenue."
      />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid produits={produits} filtres={["Sacs", "Bijoux", "Foulards", "Montres"]} />
      </section>
    </>
  );
}