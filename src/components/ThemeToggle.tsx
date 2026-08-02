"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("se_theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      title={light ? "Passer en sombre" : "Passer en clair"}
      aria-label="Changer de thème"
      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}