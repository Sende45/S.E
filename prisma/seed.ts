// prisma/seed.ts — données de démarrage S.E Holding
import { PrismaClient, Pole, CategorieBoutique } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = "yohannesende@gmail.com"; // à personnaliser
  const existant = await prisma.user.findUnique({ where: { email } });
  if (existant) {
    console.log("Admin déjà présent, ignoré.");
    return;
  }
  const motDePasse = "SeHolding2026!"; // à changer après la 1re connexion
  const hash = await bcrypt.hash(motDePasse, 12);
  await prisma.user.create({
    data: { nom: "Admin", prenom: "S.E", email, motDePasse: hash, role: "ADMIN" },
  });
  console.log("✅ Admin créé :", email, "| mot de passe :", motDePasse);
}

async function seedPrestations() {
  const data = [
    { pole: Pole.TRAITEUR, titre: "Buffets & cocktails", description: "Formules pour 20 à 500 convives." },
    { pole: Pole.TRAITEUR, titre: "Chef à domicile", description: "Un chef et sa brigade chez vous." },
    { pole: Pole.DECORATION, titre: "Décor de cérémonie", description: "Arches, allées, compositions florales." },
    { pole: Pole.EVENEMENTIEL, titre: "Coordination jour J", description: "Timing, prestataires, logistique." },
  ];
  for (const p of data) {
    await prisma.prestation.create({ data: p });
  }
  console.log("✅ Prestations créées :", data.length);
}

async function seedProduits() {
  const data = [
    { categorie: CategorieBoutique.VETEMENTS, sousCategorie: "Femme", nom: "Robe de soirée", prix: 45000, stock: 5, nouveaute: true },
    { categorie: CategorieBoutique.CHAUSSURES, sousCategorie: "Femme", nom: "Escarpins vernis", prix: 32000, stock: 8, nouveaute: true },
    { categorie: CategorieBoutique.ACCESSOIRES, sousCategorie: "Sacs", nom: "Pochette soirée", prix: 18000, stock: 12 },
  ];
  for (const p of data) {
    await prisma.produit.create({ data: p });
  }
  console.log("✅ Produits créés :", data.length);
}

async function main() {
  await seedAdmin();
  await seedPrestations();
  await seedProduits();
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());