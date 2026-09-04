"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("se_theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      title={dark ? "Passer en clair" : "Passer en sombre"}
      aria-label="Changer de thème"
      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}