import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--bg-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Marque */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold)] bg-[radial-gradient(circle_at_50%_40%,#2a0f24,#140812)] font-display text-base font-bold text-[var(--gold)]">
              S.E
            </span>
            <span className="font-display text-xl font-bold tracking-wide">
              S.E<span className="text-[var(--gold)]">·HOLDING</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            Saveurs, style et événements d'exception en République Centrafricaine.
          </p>
        </div>

        {/* Liens */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--faint)]">
            Nos univers
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Service traiteur", "/traiteur"],
              ["Décoration", "/decoration"],
              ["Événementiel", "/evenementiel"],
              ["Boutique", "/boutique"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[var(--muted)] transition-colors hover:text-[var(--gold)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--faint)]">
            Contact
          </h3>
          <div className="space-y-2.5 text-sm">
            <a
              href="tel:+236754378 78"
              className="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--gold)]"
            >
              <Phone className="h-4 w-4" /> 75 43 78 78
            </a>
            <a
              href="https://wa.me/23674017878"
              className="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--gold)]"
            >
              <MessageCircle className="h-4 w-4" /> 74 01 78 78
            </a>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <MapPin className="h-4 w-4" /> République Centrafricaine
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border-soft)] py-6 text-center text-xs text-[var(--faint)]">
        © {new Date().getFullYear()} S.E Holding · Tous droits réservés
      </div>
    </footer>
  );
}