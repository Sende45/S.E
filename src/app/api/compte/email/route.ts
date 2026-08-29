import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// =====================
// Récupérer les infos de son propre compte
// =====================
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { email: true, prenom: true, nom: true },
  });

  if (!user) {
    return NextResponse.json({ message: "Compte introuvable" }, { status: 404 });
  }

  return NextResponse.json(user);
}