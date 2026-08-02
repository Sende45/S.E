// src/app/api/realisations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Liste (publique : sert aussi les pages du site)
export async function GET(req: NextRequest) {
  const categorie = req.nextUrl.searchParams.get("categorie");
  const realisations = await prisma.realisation.findMany({
    where: categorie ? { categorie: categorie as never } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(realisations);
}

// Créer (réservé admin/staff)
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }
  const { categorie, titre, imageUrl } = await req.json();
  if (!categorie || !imageUrl) {
    return NextResponse.json({ message: "Catégorie et image requises" }, { status: 400 });
  }
  const created = await prisma.realisation.create({
    data: { categorie, titre: titre || null, imageUrl },
  });
  return NextResponse.json(created, { status: 201 });
}

// Supprimer (réservé admin/staff)
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ message: "id requis" }, { status: 400 });
  await prisma.realisation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}