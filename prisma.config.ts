// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Requis avec prisma.config.ts : `prisma db seed` lit ce champ
    // (la clé "prisma.seed" de package.json est ignorée ici).
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Helper Prisma → typé correctement (process.env[...] donnait string | undefined).
    url: env("DATABASE_URL"),
  },
});