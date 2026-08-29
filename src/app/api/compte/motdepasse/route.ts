import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// =====================
// Changer son propre mot de passe (utilisateur connecté)
// =====================
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const { ancienMotDePasse, nouveauMotDePasse } = await req.json();

    if (!ancienMotDePasse || !nouveauMotDePasse) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }
    if (nouveauMotDePasse.length < 8) {
      return NextResponse.json(
        { message: "Le nouveau mot de passe doit faire au moins 8 caractères." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user) {
      return NextResponse.json({ message: "Compte introuvable." }, { status: 404 });
    }

    const ok = await bcrypt.compare(ancienMotDePasse, user.motDePasse);
    if (!ok) {
      return NextResponse.json(
        { message: "Mot de passe actuel incorrect." },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(nouveauMotDePasse, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { motDePasse: hash },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur changement mot de passe:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}