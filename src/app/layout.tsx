import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "S.E Holding — Saveurs, Style & Événements",
  description:
    "Traiteur, décoration, événementiel et boutiques mode. L'excellence S.E en République Centrafricaine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Anti-flash : applique le thème mémorisé avant le rendu */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('se_theme')==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}