"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, ImagePlus, Loader2 } from "lucide-react";

type Realisation = {
  id: string;
  categorie: string;
  titre: string | null;
  imageUrl: string;
};

const CATEGORIES = [
  { id: "TRAITEUR", label: "Traiteur" },
  { id: "DECORATION", label: "Décoration" },
  { id: "EVENEMENTIEL", label: "Événementiel" },
  { id: "VETEMENTS", label: "Vêtements" },
  { id: "CHAUSSURES", label: "Chaussures" },
  { id: "ACCESSOIRES", label: "Accessoires" },
];

export default function RealisationsPage() {
  const [items, setItems] = useState<Realisation[]>([]);
  const [categorie, setCategorie] = useState("TRAITEUR");
  const [titre, setTitre] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const charger = async () => {
    const res = await fetch("/api/realisations");
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    charger();
  }, []);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setChargement(true);
    setErreur("");
    try {
      const base64 = await toBase64(file);
      // 1) upload vers Cloudinary
      const up = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const upData = await up.json();
      if (!up.ok) throw new Error(upData.message || "Échec de l'upload");

      // 2) enregistrer la réalisation
      const save = await fetch("/api/realisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorie, titre, imageUrl: upData.url }),
      });
      if (!save.ok) throw new Error("Échec de l'enregistrement");

      setTitre("");
      if (fileRef.current) fileRef.current.value = "";
      await charger();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur");
    } finally {
      setChargement(false);
    }
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer cette réalisation ?")) return;
    await fetch("/api/realisations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Réalisations</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Ajoutez les photos de vos réalisations. Elles s&apos;afficheront sur les pages du site.
      </p>

      {/* Formulaire d'ajout */}
      <div className="mb-10 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Catégorie</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="se-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">Titre (optionnel)</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="ex. Mariage à Bangui"
              className="se-input"
            />
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3 text-sm font-bold text-[#3A1631] transition-transform hover:-translate-y-0.5 ${chargement ? "pointer-events-none opacity-60" : ""}`}
            >
              {chargement ? <><Loader2 className="h-4 w-4 animate-spin" /> Envoi...</> : <><Upload className="h-4 w-4" /> Ajouter une photo</>}
            </label>
          </div>
        </div>
        {erreur && <p className="mt-3 text-sm text-red-400">{erreur}</p>}
      </div>

      {/* Galerie */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <ImagePlus className="mx-auto mb-3 h-8 w-8 text-[var(--faint)]" />
          <p className="text-sm text-[var(--muted)]">Aucune réalisation pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-[var(--border-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.titre || "Réalisation"} className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(to_top,rgba(20,8,18,0.85),transparent)] p-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-[var(--gold)]">
                    {CATEGORIES.find((c) => c.id === item.categorie)?.label}
                  </div>
                  {item.titre && <div className="text-xs font-semibold text-white">{item.titre}</div>}
                </div>
                <button
                  onClick={() => supprimer(item.id)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-red-500/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}