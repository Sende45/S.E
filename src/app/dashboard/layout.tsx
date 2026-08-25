// src/app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import {
  Inbox,
  Mail,
  Calendar,
  Users,
  Image as ImageIcon,
  ShoppingBag,
  ClipboardList,
  LogOut,
} from "lucide-react";
import DashboardBackButton from "@/components/BackButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const nav = [
    { href: "/dashboard", label: "Demandes", icon: Inbox },
    { href: "/dashboard/commandes", label: "Commandes", icon: ClipboardList },
    { href: "/dashboard/messages", label: "Messages", icon: Mail },
    { href: "/dashboard/produits", label: "Boutique", icon: ShoppingBag },
    { href: "/dashboard/realisations", label: "Réalisations", icon: ImageIcon },
    { href: "/dashboard/planning", label: "Planning", icon: Calendar },
    { href: "/dashboard/personnel", label: "Personnel", icon: Users },
  ];

  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-[230px_1fr]">
      {/* ===== Sidebar (desktop uniquement) ===== */}
      <aside className="hidden border-r border-[var(--border-soft)] bg-[var(--bg-2)] p-5 md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-2 px-1">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-xs font-bold text-[var(--gold)]">
            S.E
          </span>
          <span className="font-display text-lg font-bold">
            S.E<span className="text-[var(--gold)]">·Gestion</span>
          </span>
        </div>

        <nav className="space-y-1">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <form action="/api/auth/logout" method="post" className="mt-8">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </form>
      </aside>

      {/* ===== Colonne principale ===== */}
      <div className="flex min-h-screen flex-col">
        {/* Barre supérieure : bouton retour, présent sur chaque page */}
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[var(--border-soft)] bg-[var(--bg-2)]/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <DashboardBackButton />

          <span className="truncate text-xs text-[var(--faint)] sm:text-sm">
            <span className="hidden sm:inline">Connecté en tant que </span>
            <span className="font-semibold text-[var(--muted)]">
              {session.prenom}
            </span>
          </span>
        </header>

        {/* Navigation mobile (horizontale, défilante) — remplace la sidebar */}
        <nav className="flex gap-2 overflow-x-auto border-b border-[var(--border-soft)] bg-[var(--bg-2)] px-4 py-3 md:hidden">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex flex-shrink-0 items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}

          <form action="/api/auth/logout" method="post" className="flex-shrink-0">
            <button className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400">
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </form>
        </nav>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}