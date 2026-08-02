// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, motDePasse } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Seuls les rôles internes accèdent au dashboard
    if (user.role !== "ADMIN" && user.role !== "STAFF") {
      return NextResponse.json(
        { message: "Accès réservé à l'équipe S.E" },
        { status: 403 }
      );
    }

    const token = signSession({ id: user.id, role: user.role, prenom: user.prenom });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}