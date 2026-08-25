// src/app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Inbox, Mail, Package, ClipboardList } from "lucide-react";

export const dynamic = "force-dynamic"; // toujours des données fraîches

export default async function DashboardPage() {
  const session = await getSession();

  const [demandes, nbMessages, nbProduits, nbCommandes] = await Promise.all([
    prisma.demande.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.messageContact.count({ where: { traite: false } }),
    prisma.produit.count({ where: { actif: true } }),
    prisma.commande.count({ where: { statut: "NOUVELLE" } }),
  ]);

  const nbNouvelles = demandes.filter((d) => d.statut === "NOUVELLE").length;

  const statutPill: Record<string, string> = {
    NOUVELLE: "bg-[rgba(228,190,85,0.15)] text-[var(--gold)]",
    DEVIS_ENVOYE: "bg-[rgba(120,120,140,0.16)] text-[var(--muted)]",
    ACCEPTEE: "bg-[rgba(76,175,127,0.16)] text-[#5fbf8f]",
    REFUSEE: "bg-red-500/15 text-red-400",
  };
  const statutLabel: Record<string, string> = {
    NOUVELLE: "Nouvelle",
    DEVIS_ENVOYE: "Devis envoyé",
    ACCEPTEE: "Acceptée",
    REFUSEE: "Refusée",
  };

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">
        Bonjour, {session?.prenom}
      </h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Voici les dernières demandes reçues.
      </p>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Inbox} label="Demandes à traiter" value={nbNouvelles} />
        <Stat icon={ClipboardList} label="Commandes nouvelles" value={nbCommandes} />
        <Stat icon={Mail} label="Messages non lus" value={nbMessages} />
        <Stat icon={Package} label="Produits en ligne" value={nbProduits} />
      </div>

      {/* Table des demandes */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border-soft)] px-6 py-4">
          <h2 className="font-display text-xl font-semibold">Demandes de devis</h2>
        </div>
        {demandes.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[var(--muted)]">
            Aucune demande pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[var(--bg-2)] text-left text-[11px] uppercase tracking-wider text-[var(--faint)]">
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Événement</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Reçue le</th>
                <th className="px-6 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((d) => (
                <tr key={d.id} className="border-t border-[var(--border-soft)]">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{d.nomContact}</div>
                    <div className="text-xs text-[var(--muted)]">{d.telephone}</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">{d.typeEvenement}</td>
                  <td className="px-6 py-4 text-[var(--muted)] whitespace-nowrap">
                    {d.dateEvenement
                      ? new Date(d.dateEvenement).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)] whitespace-nowrap">
                    {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statutPill[d.statut]}`}>
                      {statutLabel[d.statut]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--faint)]">
          {label}
        </span>
        <Icon className="h-5 w-5 text-[var(--gold)]" />
      </div>
      <div className="mt-3 font-display text-4xl font-semibold">{value}</div>
    </div>
  );
}