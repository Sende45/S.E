import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// =====================
// Modifier un produit
// =====================
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getSession();

  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json(
      { message: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const produit = await prisma.produit.update({
      where: {
        id,
      },
      data: {
        categorie: body.categorie,
        sousCategorie: body.sousCategorie,
        nom: body.nom,
        description: body.description,
        prix: Number(body.prix),
        photos: body.photos ?? [],
        nouveaute: body.nouveaute,
        disponible: body.disponible,
        actif: body.actif,
      },
    });

    return NextResponse.json(produit);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la modification",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================
// Supprimer un produit
// =====================
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const session = await getSession();

  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json(
      { message: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    await prisma.produit.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la suppression",
      },
      {
        status: 500,
      }
    );
  }
}