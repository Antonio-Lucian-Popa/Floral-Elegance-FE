"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export function useAuth() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // If we have a refresh token error, sign in again
      signIn("keycloak"); // Force re-authentication
    }
  }, [session]);

  return session;
}