import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { MethodePaiement } from "@prisma/client";

type ItemEntrant = {
  produitId?: string;
  nom?: string;
  prix?: number;
  quantite?: number;
};

const PAIEMENTS: MethodePaiement[] = ["LIVRAISON", "MOBILE_MONEY", "ESPECES"];

function genererNumero() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(d.getDate()).padStart(2, "0")}`;
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `SE-${ymd}-${rnd}`;
}

// =====================
// Créer une commande (public)
// =====================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomClient,
      telephone,
      email,
      adresse,
      note,
      methodePaiement,
      items,
    } = body as {
      nomClient?: string;
      telephone?: string;
      email?: string;
      adresse?: string;
      note?: string;
      methodePaiement?: string;
      items?: ItemEntrant[];
    };

    if (!nomClient || !telephone) {
      return NextResponse.json(
        { message: "Le nom et le téléphone sont requis." },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Votre panier est vide." },
        { status: 400 }
      );
    }

    const methode: MethodePaiement = PAIEMENTS.includes(
      methodePaiement as MethodePaiement
    )
      ? (methodePaiement as MethodePaiement)
      : "LIVRAISON";

    // On recalcule les prix côté serveur à partir de la base (anti-triche)
    const ids = items
      .map((i) => i.produitId)
      .filter((v): v is string => Boolean(v));

    const produitsBase = ids.length
      ? await prisma.produit.findMany({ where: { id: { in: ids } } })
      : [];
    const parId = new Map(produitsBase.map((p) => [p.id, p]));

    const lignes = items.map((i) => {
      const base = i.produitId ? parId.get(i.produitId) : undefined;
      const prixUnitaire = base ? base.prix : Number(i.prix) || 0;
      const nomProduit = base ? base.nom : String(i.nom ?? "Article");
      const quantite = Math.max(1, Number(i.quantite) || 1);
      return {
        produitId: base ? base.id : null,
        nomProduit,
        prixUnitaire,
        quantite,
      };
    });

    const total = lignes.reduce(
      (s, l) => s + l.prixUnitaire * l.quantite,
      0
    );

    const commande = await prisma.commande.create({
      data: {
        numero: genererNumero(),
        nomClient,
        telephone,
        email: email || null,
        adresse: adresse || null,
        note: note || null,
        methodePaiement: methode,
        total,
        lignes: { create: lignes },
      },
    });

    return NextResponse.json(
      { ok: true, numero: commande.numero, id: commande.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur /api/commandes:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// =====================
// Lister les commandes (interne)
// =====================
export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const commandes = await prisma.commande.findMany({
    orderBy: { createdAt: "desc" },
    include: { lignes: true },
  });

  return NextResponse.json(commandes);
}