// src/app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Inbox, Mail, Calendar, Users, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const nav = [
    { href: "/dashboard", label: "Demandes", icon: Inbox },
    { href: "/dashboard/messages", label: "Messages", icon: Mail },
    { href: "/dashboard/planning", label: "Planning", icon: Calendar },
    { href: "/dashboard/personnel", label: "Personnel", icon: Users },
  ];

  return (
    <div className="grid min-h-screen md:grid-cols-[230px_1fr]">
      {/* Sidebar */}
      <aside className="border-r border-[var(--border-soft)] bg-[var(--bg-2)] p-5">
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

      <main className="overflow-auto p-8">{children}</main>
    </div>
  );
}