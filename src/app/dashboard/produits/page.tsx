"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Upload,
  Trash2,
  Pencil,
  X,
  Loader2,
  Package,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";

type Produit = {
  id: string;
  univers: "MODE" | "SUPERMARCHE";
  categorie: "VETEMENTS" | "CHAUSSURES" | "ACCESSOIRES" | null;
  rayon: "ALIMENTATION" | "LIQUEURS" | "HYGIENE" | "MINISHOP" | null;
  sousCategorie: string | null;
  nom: string;
  description: string | null;
  prix: number;
  photos: string[];
  nouveaute: boolean;
  disponible: boolean;
  actif: boolean;
  createdAt: string;
};

const CATEGORIES = [
  { id: "VETEMENTS", label: "Vêtements" },
  { id: "CHAUSSURES", label: "Chaussures" },
  { id: "ACCESSOIRES", label: "Accessoires" },
] as const;

const RAYONS_SUPERMARCHE = [
  { id: "ALIMENTATION", label: "Alimentation" },
  { id: "LIQUEURS", label: "Liqueurs" },
  { id: "HYGIENE", label: "Hygiène & Beauté" },
  { id: "MINISHOP", label: "Mini Shop" },
] as const;

// Suggestions de sous-catégories par rayon (affichées dans un <datalist>)
const SOUS_CATEGORIES: Record<string, string[]> = {
  VETEMENTS: ["Femme", "Homme", "Cérémonie"],
  CHAUSSURES: ["Femme", "Homme", "Cérémonie"],
  ACCESSOIRES: ["Sacs", "Bijoux", "Foulards", "Montres"],
};

type FormState = {
  univers: "MODE" | "SUPERMARCHE";
  categorie: "VETEMENTS" | "CHAUSSURES" | "ACCESSOIRES";
  rayon: "ALIMENTATION" | "LIQUEURS" | "HYGIENE" | "MINISHOP";
  sousCategorie: string;
  nom: string;
  description: string;
  prix: string;
  photos: string[];
  nouveaute: boolean;
  disponible: boolean;
};

const FORM_VIDE: FormState = {
  univers: "MODE",
  categorie: "VETEMENTS",
  rayon: "ALIMENTATION",
  sousCategorie: "",
  nom: "",
  description: "",
  prix: "",
  photos: [],
  nouveaute: false,
  disponible: true,
};

export default function ProduitsPage() {
  const [items, setItems] = useState<Produit[]>([]);
  const [chargementListe, setChargementListe] = useState(true);
  const [editId, setEditId] = useState<string | null>(null); // null = mode création
  const [form, setForm] = useState<FormState>(FORM_VIDE);
  const [uploadEnCours, setUploadEnCours] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const charger = async () => {
    setChargementListe(true);
    try {
      const res = await fetch("/api/produits");
      if (res.ok) setItems(await res.json());
    } finally {
      setChargementListe(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const maj = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Upload d'une ou plusieurs photos vers Cloudinary, puis ajout des URL au formulaire
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadEnCours(true);
    setErreur("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const base64 = await toBase64(file);
        const up = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        const upData = await up.json();
        if (!up.ok) throw new Error(upData.message || "Échec de l'upload");
        urls.push(upData.url);
      }
      setForm((f) => ({ ...f, photos: [...f.photos, ...urls] }));
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur d'upload");
    } finally {
      setUploadEnCours(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const retirerPhoto = (index: number) =>
    setForm((f) => ({ ...f, photos: f.photos.filter((_, i) => i !== index) }));

  const reinitialiser = () => {
    setEditId(null);
    setForm(FORM_VIDE);
    setErreur("");
  };

  const commencerEdition = (p: Produit) => {
    setEditId(p.id);
    setForm({
      univers: p.univers,
      categorie: p.categorie ?? "VETEMENTS",
      rayon: p.rayon ?? "ALIMENTATION",
      sousCategorie: p.sousCategorie ?? "",
      nom: p.nom,
      description: p.description ?? "",
      prix: String(p.prix),
      photos: p.photos ?? [],
      nouveaute: p.nouveaute,
      disponible: p.disponible,
    });
    setErreur("");
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.prix) {
      setErreur("Le nom et le prix sont obligatoires.");
      return;
    }
    setEnvoi(true);
    setErreur("");
    try {
      const payload = {
        univers: form.univers,
        categorie: form.categorie,
        rayon: form.rayon,
        sousCategorie: form.sousCategorie.trim() || null,
        nom: form.nom.trim(),
        description: form.description.trim() || null,
        prix: Number(String(form.prix).replace(/\D/g, "")),
        photos: form.photos,
        nouveaute: form.nouveaute,
        disponible: form.disponible,
        actif: true,
      };

      const res = await fetch(
        editId ? `/api/produits/${editId}` : "/api/produits",
        {
          method: editId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Enregistrement impossible");
      }
      reinitialiser();
      await charger();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur");
    } finally {
      setEnvoi(false);
    }
  };

  // Bascule rapide d'un booléen (disponible / nouveaute) via PUT, sans ouvrir le formulaire
  const basculer = async (p: Produit, champ: "disponible" | "nouveaute") => {
    const optimiste = items.map((i) =>
      i.id === p.id ? { ...i, [champ]: !i[champ] } : i
    );
    setItems(optimiste);
    const res = await fetch(`/api/produits/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, [champ]: !p[champ] }),
    });
    if (!res.ok) await charger(); // rollback en rechargeant si l'API refuse
  };

  const supprimer = async (id: string) => {
    if (!confirm("Supprimer définitivement ce produit ?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (editId === id) reinitialiser();
    const res = await fetch(`/api/produits/${id}`, { method: "DELETE" });
    if (!res.ok) await charger();
  };

  const labelProduit = (p: Produit) =>
    p.univers === "SUPERMARCHE"
      ? RAYONS_SUPERMARCHE.find((r) => r.id === p.rayon)?.label ?? "Supermarché"
      : CATEGORIES.find((c) => c.id === p.categorie)?.label ?? "Boutique";

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Boutique</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Ajoutez et gérez les articles affichés dans la boutique du site.
          </p>
        </div>
        <span className="hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] sm:inline-block">
          {items.length} article{items.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Formulaire (création / édition) */}
      <div className="mb-10 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            {editId ? (
              <>
                <Pencil className="h-5 w-5 text-[var(--gold)]" /> Modifier l’article
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-[var(--gold)]" /> Nouvel article
              </>
            )}
          </h2>
          {editId && (
            <button
              onClick={reinitialiser}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--gold)]"
            >
              <X className="h-4 w-4" /> Annuler
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photos */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
              Photos
            </label>
            <div className="flex flex-wrap gap-3">
              {form.photos.map((url, i) => (
                <div
                  key={url}
                  className="relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--border-soft)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded bg-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#3A1631]">
                      Principale
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => retirerPhoto(i)}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white transition hover:bg-red-500"
                    aria-label="Retirer la photo"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
                id="produit-photos"
              />
              <label
                htmlFor="produit-photos"
                className={`grid h-24 w-24 cursor-pointer place-items-center rounded-xl border border-dashed border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] ${
                  uploadEnCours ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {uploadEnCours ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <span className="flex flex-col items-center gap-1 text-xs">
                    <Upload className="h-5 w-5" /> Ajouter
                  </span>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
              Univers
            </label>
            <select
              className="se-input"
              value={form.univers}
              onChange={(e) =>
                maj("univers", e.target.value as FormState["univers"])
              }
            >
              <option value="MODE">Boutique (Mode)</option>
              <option value="SUPERMARCHE">Supermarché</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                {form.univers === "SUPERMARCHE" ? "Rayon" : "Catégorie"}
              </label>
              {form.univers === "SUPERMARCHE" ? (
                <select
                  className="se-input"
                  value={form.rayon}
                  onChange={(e) =>
                    maj("rayon", e.target.value as FormState["rayon"])
                  }
                >
                  {RAYONS_SUPERMARCHE.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className="se-input"
                  value={form.categorie}
                  onChange={(e) =>
                    maj("categorie", e.target.value as FormState["categorie"])
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                Sous-catégorie (optionnel)
              </label>
              <input
                type="text"
                list="sous-categories"
                className="se-input"
                placeholder="ex. Femme, Sacs…"
                value={form.sousCategorie}
                onChange={(e) => maj("sousCategorie", e.target.value)}
              />
              <datalist id="sous-categories">
                {(SOUS_CATEGORIES[form.categorie] ?? []).map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                Nom de l’article
              </label>
              <input
                type="text"
                className="se-input"
                placeholder="ex. Robe de soirée"
                value={form.nom}
                onChange={(e) => maj("nom", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                Prix (FCFA)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="se-input"
                placeholder="ex. 45 000"
                value={form.prix}
                onChange={(e) => maj("prix", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
              Description (optionnel)
            </label>
            <textarea
              className="se-input min-h-[90px] resize-y"
              placeholder="Matière, coloris, tailles disponibles…"
              value={form.description}
              onChange={(e) => maj("description", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]">
              <input
                type="checkbox"
                checked={form.nouveaute}
                onChange={(e) => maj("nouveaute", e.target.checked)}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              Marquer comme nouveauté
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]">
              <input
                type="checkbox"
                checked={form.disponible}
                onChange={(e) => maj("disponible", e.target.checked)}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              Disponible (visible sur le site)
            </label>
          </div>

          {erreur && <p className="text-sm text-red-400">{erreur}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={envoi || uploadEnCours}
              className="flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-6 py-3 text-sm font-bold text-[#3A1631] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {envoi ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enregistrement…
                </>
              ) : editId ? (
                "Enregistrer les modifications"
              ) : (
                "Ajouter l’article"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Liste des produits */}
      {chargementListe ? (
        <div className="grid place-items-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-[var(--muted)]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <Package className="mx-auto mb-3 h-8 w-8 text-[var(--faint)]" />
          <p className="text-sm text-[var(--muted)]">
            Aucun article pour le moment. Ajoutez-en un ci-dessus.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.id}
              className={`flex gap-4 rounded-2xl border bg-[var(--surface)] p-4 transition-colors ${
                editId === p.id
                  ? "border-[var(--gold)]"
                  : "border-[var(--border-soft)]"
              } ${!p.disponible ? "opacity-70" : ""}`}
            >
              <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--bg-2)]">
                {p.photos?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photos[0]}
                    alt={p.nom}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[var(--faint)]">
                    <Package className="h-6 w-6" />
                  </div>
                )}
                {p.nouveaute && (
                  <span className="absolute left-1 top-1 rounded bg-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#3A1631]">
                    Nouveau
                  </span>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                  {labelProduit(p)}
                  {p.sousCategorie ? ` · ${p.sousCategorie}` : ""}
                </div>
                <h3 className="truncate font-display text-lg font-semibold">
                  {p.nom}
                </h3>
                <div className="mt-0.5 text-sm font-bold">
                  {p.prix.toLocaleString("fr-FR")}{" "}
                  <span className="text-xs font-medium text-[var(--faint)]">
                    FCFA
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
                  <button
                    onClick={() => commencerEdition(p)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-soft)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    aria-label="Modifier"
                    title="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => basculer(p, "disponible")}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-soft)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    aria-label={p.disponible ? "Masquer du site" : "Afficher sur le site"}
                    title={p.disponible ? "Masquer du site" : "Afficher sur le site"}
                  >
                    {p.disponible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => basculer(p, "nouveaute")}
                    className={`grid h-8 w-8 place-items-center rounded-lg border transition ${
                      p.nouveaute
                        ? "border-[var(--gold)] text-[var(--gold)]"
                        : "border-[var(--border-soft)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    }`}
                    aria-label="Nouveauté"
                    title="Marquer / retirer nouveauté"
                  >
                    <Star
                      className="h-4 w-4"
                      fill={p.nouveaute ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => supprimer(p.id)}
                    className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-soft)] text-red-400 transition hover:border-red-500 hover:bg-red-500/10"
                    aria-label="Supprimer"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}