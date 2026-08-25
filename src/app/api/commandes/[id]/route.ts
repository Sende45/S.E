import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { StatutCommande } from "@prisma/client";

type Params = {
  params: Promise<{ id: string }>;
};

const STATUTS: StatutCommande[] = [
  "NOUVELLE",
  "CONFIRMEE",
  "EN_PREPARATION",
  "EXPEDIEE",
  "LIVREE",
  "ANNULEE",
];

// =====================
// Mettre à jour le statut d'une commande
// =====================
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    if (!STATUTS.includes(body.statut)) {
      return NextResponse.json({ message: "Statut invalide" }, { status: 400 });
    }

    const commande = await prisma.commande.update({
      where: { id },
      data: { statut: body.statut },
    });

    return NextResponse.json(commande);
  } catch (error) {
    console.error("Erreur PATCH /api/commandes/[id]:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}