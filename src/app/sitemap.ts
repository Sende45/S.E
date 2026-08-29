import type { MetadataRoute } from "next";

// Domaine du site. Défini via la variable d'environnement NEXT_PUBLIC_SITE_URL
// sur Vercel (ex. https://www.se-holding.com). Valeur de repli sinon.
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.se-holding.com"
).replace(/\/$/, "");

type Entree = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Entree[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/traiteur", changeFrequency: "monthly", priority: 0.9 },
    { path: "/decoration", changeFrequency: "monthly", priority: 0.9 },
    { path: "/evenementiel", changeFrequency: "monthly", priority: 0.9 },
    { path: "/boutique", changeFrequency: "weekly", priority: 0.9 },
    { path: "/boutique/vetements", changeFrequency: "weekly", priority: 0.8 },
    { path: "/boutique/chaussures", changeFrequency: "weekly", priority: 0.8 },
    { path: "/boutique/accessoires", changeFrequency: "weekly", priority: 0.8 },
    { path: "/devis", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ];

  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}