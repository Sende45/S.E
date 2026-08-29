import type { MetadataRoute } from "next";

// Même domaine que le sitemap (défini via NEXT_PUBLIC_SITE_URL sur Vercel).
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://s-e-chi.vercel.app"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages privées / sans intérêt pour l'indexation
      disallow: ["/dashboard", "/login", "/commande", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}