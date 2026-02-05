"use client";

import {
  onIdTokenChanged,
  getIdTokenResult,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const MIN_RANK = 2;

const AUTH_EXEMPT_ROUTES = ["/auth/complete", "/auth/twofactor"];

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
        const rank = Number(tokenResult.claims.groupRank);
        const isAuthExempt = AUTH_EXEMPT_ROUTES.some((route) =>
          pathname.startsWith(route),
        );

        // enforce rank req
        if (!rank || rank < MIN_RANK) {
          console.warn("User rank too low, logging out");
          await signOut(auth);
          router.push("/auth/login");
          return;
        }

        if (!tokenResult.claims.authenticated && !isAuthExempt && rank !== 4) {
          console.warn("User not verified, redirecting to 2fa...");
          router.push("/auth/twofactor");
          return;
        }

        setUser(firebaseUser);
        setClaims(tokenResult.claims);
      } catch (err) {
        console.error("Auth validation failed:", err);
        await signOut(auth);
        router.push("/auth/login");
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router, pathname]);

  const lastRankCheckRef = useRef<number>(0);

  useEffect(() => {
    // periodic rank check
    if (!user || !claims) return;

    const checkRank = async () => {
      const now = Date.now();

      if (now - lastRankCheckRef.current < 60000) {
        return;
      }

      try {
        const isAuthExempt = AUTH_EXEMPT_ROUTES.some((route) =>
          pathname.startsWith(route),
        );

        if (isAuthExempt) return;

        const robloxUserId = claims.userId;
        const res = await fetch(`/api/player-rank?userId=${robloxUserId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch player rank");
        }

        let currentRank = 0;
        const data = await res.json();
        data?.data?.forEach((group: any) => {
          if (group.group.id == "5479316") {
            currentRank = group.role.rank;
          }
        });

        lastRankCheckRef.current = now;

        if (currentRank < MIN_RANK) {
          console.warn(
            "User rank dropped below minimum, logging out",
            currentRank,
          );
          const token = await user.getIdToken();
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then(async () => {
              await signOut(auth);
              router.push("/auth/login");
            })
            .catch((err) => {
              console.error("Error during logout fetch:", err);
            });
        }
      } catch (err) {
        console.error("Rank check failed:", err);
      }
    };
    const interval = setInterval(checkRank, 10000);

    return () => clearInterval(interval);
  }, [user, claims, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, claims, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
