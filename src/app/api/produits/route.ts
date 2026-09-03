import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const produits = await prisma.produit.findMany({
    orderBy: {
      nom: "asc",
    },
  });

  return NextResponse.json(produits);
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json(
      { message: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const produit = await prisma.produit.create({
      data: {
        univers: body.univers === "SUPERMARCHE" ? "SUPERMARCHE" : "MODE",
        categorie: body.univers === "SUPERMARCHE" ? null : body.categorie,
        rayon: body.univers === "SUPERMARCHE" ? body.rayon : null,
        sousCategorie: body.sousCategorie,
        nom: body.nom,
        description: body.description,
        prix: Number(body.prix),
        photos: body.photos ?? [],
        nouveaute: body.nouveaute ?? false,
        disponible: body.disponible ?? true,
        actif: true,
      },
    });

    return NextResponse.json(produit);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}