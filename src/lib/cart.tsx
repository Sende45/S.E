"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  nom: string;
  prix: number;
  image?: string;
  cat?: string;
  quantite: number;
};

type CartContextValue = {
  items: CartItem[];
  ajouter: (produit: Omit<CartItem, "quantite">, quantite?: number) => void;
  retirer: (id: string) => void;
  changerQuantite: (id: string, quantite: number) => void;
  vider: () => void;
  ouvrir: () => void;
  fermer: () => void;
  ouvert: boolean;
  nbArticles: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "se-panier";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [charge, setCharge] = useState(false);

  // Chargement depuis localStorage (une seule fois, côté client)
  useEffect(() => {
    try {
      const brut = localStorage.getItem(STORAGE_KEY);
      if (brut) setItems(JSON.parse(brut));
    } catch {
      /* localStorage indisponible : on ignore */
    }
    setCharge(true);
  }, []);

  // Persistance à chaque changement
  useEffect(() => {
    if (!charge) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, charge]);

  const ajouter = useCallback(
    (produit: Omit<CartItem, "quantite">, quantite = 1) => {
      setItems((prev) => {
        const existant = prev.find((i) => i.id === produit.id);
        if (existant) {
          return prev.map((i) =>
            i.id === produit.id
              ? { ...i, quantite: i.quantite + quantite }
              : i
          );
        }
        return [...prev, { ...produit, quantite }];
      });
      setOuvert(true);
    },
    []
  );

  const retirer = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changerQuantite = useCallback((id: string, quantite: number) => {
    setItems((prev) =>
      quantite <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantite } : i))
    );
  }, []);

  const vider = useCallback(() => setItems([]), []);
  const ouvrir = useCallback(() => setOuvert(true), []);
  const fermer = useCallback(() => setOuvert(false), []);

  const nbArticles = useMemo(
    () => items.reduce((n, i) => n + i.quantite, 0),
    [items]
  );
  const total = useMemo(
    () => items.reduce((s, i) => s + i.prix * i.quantite, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ajouter,
      retirer,
      changerQuantite,
      vider,
      ouvrir,
      fermer,
      ouvert,
      nbArticles,
      total,
    }),
    [
      items,
      ajouter,
      retirer,
      changerQuantite,
      vider,
      ouvrir,
      fermer,
      ouvert,
      nbArticles,
      total,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}