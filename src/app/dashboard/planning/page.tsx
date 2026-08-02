// src/app/dashboard/planning/page.tsx
import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PlanningPage() {
  // Événements = demandes acceptées avec une date, triées par date
  const evenements = await prisma.demande.findMany({
    where: { statut: "ACCEPTEE", dateEvenement: { not: null } },
    orderBy: { dateEvenement: "asc" },
  });

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Planning</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Les événements confirmés, du plus proche au plus lointain.
      </p>

      {evenements.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <Calendar className="mx-auto mb-3 h-8 w-8 text-[var(--faint)]" />
          <p className="text-sm text-[var(--muted)]">
            Aucun événement confirmé pour l&apos;instant.
          </p>
          <p className="mt-1 text-xs text-[var(--faint)]">
            Une demande apparaît ici quand son statut passe à « Acceptée ».
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {evenements.map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5"
            >
              <div className="grid h-16 w-16 flex-none place-items-center rounded-xl border border-[var(--border)] bg-[rgba(201,162,39,0.10)] text-center">
                <span className="font-display text-xl font-semibold leading-none text-[var(--gold)]">
                  {new Date(e.dateEvenement!).getDate()}
                </span>
                <span className="text-[10px] uppercase text-[var(--muted)]">
                  {new Date(e.dateEvenement!).toLocaleDateString("fr-FR", { month: "short" })}
                </span>
              </div>
              <div>
                <div className="font-display text-lg font-semibold">{e.typeEvenement}</div>
                <div className="text-sm text-[var(--muted)]">
                  {e.nomContact} · {e.telephone}
                  {e.nombreInvites ? ` · ${e.nombreInvites} invités` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}