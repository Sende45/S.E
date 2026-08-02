// src/app/dashboard/personnel/page.tsx
import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PersonnelPage() {
  const personnel = await prisma.personnel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Personnel</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        L&apos;équipe mobilisable pour les événements.
      </p>

      {personnel.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-[var(--faint)]" />
          <p className="text-sm text-[var(--muted)]">Aucun membre du personnel enregistré.</p>
          <p className="mt-1 text-xs text-[var(--faint)]">
            L&apos;ajout de personnel se fera bientôt depuis cette page.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {personnel.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4"
            >
              <div className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[var(--border)] bg-[rgba(201,162,39,0.12)] font-semibold text-[var(--gold)]">
                {p.prenom[0]}{p.nom[0]}
              </div>
              <div>
                <div className="font-semibold">{p.prenom} {p.nom}</div>
                <div className="text-sm text-[var(--muted)]">{p.fonction}</div>
              </div>
              {!p.actif && (
                <span className="ml-auto rounded-full bg-[rgba(120,120,140,0.16)] px-3 py-1 text-xs text-[var(--muted)]">
                  Inactif
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}