"use client";

import {
  onIdTokenChanged,
  getIdTokenResult,
  signOut,
  User
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MIN_RANK = 4;

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        setClaims(null);
        setLoading(false);
        return;
      }

      try {
        const tokenResult = await getIdTokenResult(firebaseUser, true);
        const rank = tokenResult.claims.groupRank;

        // enforce rank req
        if (!rank || rank < MIN_RANK) {
          console.warn("User rank too low, logging out");
          await signOut(auth);
          router.push("/login");
          return;
        }

        setUser(firebaseUser);
        setClaims(tokenResult.claims);
      } catch (err) {
        console.error("Auth validation failed:", err);
        await signOut(auth);
        router.push("/login");
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, claims, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
