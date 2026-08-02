// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { nom, telephone, email, sujet, message } = await req.json();

    if (!nom || !message) {
      return NextResponse.json(
        { message: "Le nom et le message sont requis." },
        { status: 400 }
      );
    }

    const contact = await prisma.messageContact.create({
      data: {
        nom,
        telephone: telephone || null,
        email: email || null,
        sujet: sujet || null,
        message,
      },
    });

    return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur /api/contact:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}