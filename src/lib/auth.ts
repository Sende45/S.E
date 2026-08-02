// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;
const COOKIE = "se_session";

export type Session = {
  id: string;
  role: "ADMIN" | "STAFF" | "CLIENT";
  prenom: string;
};

export function signSession(payload: Session): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// À utiliser dans les Server Components / layouts
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as Session;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE;