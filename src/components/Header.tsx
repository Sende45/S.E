"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import CartButton from "@/components/CartButton";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/decoration", label: "Décoration" },
  { href: "/evenementiel", label: "Événementiel" },
  { href: "/boutique", label: "Boutique" },
  { href: "/supermarche", label: "Supermarché" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Ferme automatiquement le menu lors d'un changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--bg-2)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-sm font-bold text-[var(--gold)] sm:h-11 sm:w-11 sm:text-base"
            animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={{ scale: 1.15, rotate: -8 }}
          >
            S.E
          </motion.span>

          <span className="leading-none">
            <span className="font-display text-base font-bold tracking-wide sm:text-xl">
              S.E
              <span className="text-[var(--gold)]">·HOLDING</span>
            </span>

            <span className="mt-1 hidden text-[9px] uppercase tracking-[0.25em] text-[var(--faint)] sm:block">
              Saveurs · Style · Événements
            </span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
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
        <div className="flex items-center gap-2 sm:gap-3 lg:ml-8">
          <ThemeToggle />

          <CartButton />

          <Link
            href="/devis"
            className="hidden rounded-lg bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-4 py-2 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)] transition-transform hover:-translate-y-0.5 lg:inline-block"
          >
            Demander un devis
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-screen border-t border-[var(--border-soft)]" : "max-h-0"
        }`}
      >
        <div className="bg-[var(--bg-2)] px-4 py-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const actif = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    actif
                      ? "bg-[rgba(201,162,39,0.12)] text-[var(--gold)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--gold)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/devis"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--gold),var(--gold-deep))] px-4 py-3 text-sm font-bold text-[#3A1631] shadow-[0_6px_18px_rgba(201,162,39,0.25)]"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </header>
  );
}