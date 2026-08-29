import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =====================
// Changer son email (= identifiant de connexion)
// =====================
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const { motDePasse, nouveauEmail } = await req.json();

    if (!motDePasse || !nouveauEmail) {
      return NextResponse.json(
        { message: "Le mot de passe et le nouvel email sont requis." },
        { status: 400 }
      );
    }

    const email = String(nouveauEmail).trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Format d'email invalide." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user) {
      return NextResponse.json({ message: "Compte introuvable." }, { status: 404 });
    }

    // Confirmation par mot de passe (sécurité)
    const ok = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!ok) {
      return NextResponse.json(
        { message: "Mot de passe incorrect." },
        { status: 400 }
      );
    }

    // Email déjà utilisé par un autre compte ?
    const dejaPris = await prisma.user.findUnique({ where: { email } });
    if (dejaPris && dejaPris.id !== user.id) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé." },
        { status: 409 }
      );
    }

    await prisma.user.update({ where: { id: user.id }, data: { email } });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    console.error("Erreur changement email:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}