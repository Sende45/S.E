// src/app/dashboard/messages/page.tsx
import { prisma } from "@/lib/prisma";
import { Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.messageContact.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Messages de contact</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Les messages envoyés depuis le formulaire de contact.
      </p>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center">
          <Mail className="mx-auto mb-3 h-8 w-8 text-[var(--faint)]" />
          <p className="text-sm text-[var(--muted)]">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{m.nom}</span>
                <span className="text-xs text-[var(--faint)]">
                  {new Date(m.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
              {m.sujet && (
                <div className="mb-1 text-sm font-semibold text-[var(--gold)]">{m.sujet}</div>
              )}
              <p className="text-sm leading-relaxed text-[var(--muted)]">{m.message}</p>
              <div className="mt-3 flex gap-4 text-xs text-[var(--faint)]">
                {m.telephone && <span>📞 {m.telephone}</span>}
                {m.email && <span>✉ {m.email}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}