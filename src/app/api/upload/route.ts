// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const { image } = await req.json(); // data URL : "data:image/...;base64,...."
    if (!image) {
      return NextResponse.json({ message: "Aucune image fournie" }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "se-holding",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Erreur upload:", error);
    return NextResponse.json({ message: "Échec de l'upload" }, { status: 500 });
  }
}