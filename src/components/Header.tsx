"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/decoration", label: "Décoration" },
  { href: "/evenementiel", label: "Événementiel" },
  { href: "/boutique", label: "Boutique" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--bg-2)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-base font-bold text-[var(--gold)]">
            S.E
          </span>
          <span className="leading-none">
            <span className="font-display text-xl font-bold tracking-wide">
              S.E<span className="text-[var(--gold)]">·HOLDING</span>
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.25em] text-[var(--faint)]">
              Saveurs · Style · Événements
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const actif = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  actif
                    ? "text-[var(--gold)]"
                    : "text-[var(--muted)] hover:text-[var(--gold)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/devis"
            className="hidden rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-5 py-2.5 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            Demander un devis
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface)] md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-[var(--border-soft)] bg-[var(--bg-2)] px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--gold)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/devis"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-4 py-3 text-center text-sm font-bold text-[#3A1631]"
          >
            Demander un devis
          </Link>
        </div>
      )}
    </header>
  );
}