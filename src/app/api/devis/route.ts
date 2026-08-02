// src/app/api/devis/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Pole } from "@prisma/client";

// Convertit les identifiants du formulaire ("traiteur") vers l'enum Prisma (TRAITEUR)
const POLE_MAP: Record<string, Pole> = {
  traiteur: "TRAITEUR",
  decoration: "DECORATION",
  evenementiel: "EVENEMENTIEL",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomContact,
      telephone,
      typeEvenement,
      dateEvenement,
      nombreInvites,
      budgetIndicatif,
      poles,
      message,
    } = body;

    // Validation minimale
    if (!nomContact || !telephone || !typeEvenement) {
      return NextResponse.json(
        { message: "Nom, téléphone et type d'événement sont requis." },
        { status: 400 }
      );
    }

    const polesEnum = Array.isArray(poles)
      ? poles.map((p: string) => POLE_MAP[p]).filter(Boolean)
      : [];

    const demande = await prisma.demande.create({
      data: {
        nomContact,
        telephone,
        typeEvenement,
        dateEvenement: dateEvenement ? new Date(dateEvenement) : null,
        nombreInvites: nombreInvites ? Number(nombreInvites) : null,
        budgetIndicatif: budgetIndicatif
          ? Number(String(budgetIndicatif).replace(/\D/g, ""))
          : null,
        poles: polesEnum,
        message: message || null,
      },
    });

    return NextResponse.json({ ok: true, id: demande.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur /api/devis:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}