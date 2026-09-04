import "./globals.css";
import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
  Playfair_Display,
  Poppins,
} from "next/font/google";

// Thème 1 (sombre) : Cormorant + Inter
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

// Thème 3 (clair, par défaut) : Playfair Display + Poppins
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
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
    <html
      lang="fr"
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${poppins.variable}`}
    >
      <head>
        {/* Anti-flash : le thème par défaut est clair ; on applique le sombre s'il est mémorisé */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('se_theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}