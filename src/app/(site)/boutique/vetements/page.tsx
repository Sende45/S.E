import ShopHeader from "@/components/ShopHeader";
import ProductGrid, { Produit } from "@/components/ProductGrid";

const produits: Produit[] = [
  { id: "v1", nom: "Robe de soirée", cat: "Femme", prix: 45000, emoji: "👗", from: "#6b2a4e", to: "#3a1631", nouveaute: true },
  { id: "v2", nom: "Ensemble pagne", cat: "Cérémonie", prix: 38000, emoji: "🥻", from: "#7a4a6b", to: "#34122c" },
  { id: "v3", nom: "Costume sur-mesure", cat: "Homme", prix: 75000, emoji: "👔", from: "#8a5a2a", to: "#4a1d3f" },
  { id: "v4", nom: "Blouse brodée", cat: "Femme", prix: 22000, emoji: "👚", from: "#5b2a4e", to: "#2a0f24", nouveaute: true },
];

export default function VetementsPage() {
  return (
    <>
      <ShopHeader
        titre="Vêtements"
        intro="Une sélection élégante pour toutes vos occasions — du quotidien à la grande soirée."
      />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ProductGrid produits={produits} filtres={["Femme", "Homme", "Cérémonie"]} />
      </section>
    </>
  );
}