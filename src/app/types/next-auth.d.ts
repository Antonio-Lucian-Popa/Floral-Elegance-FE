import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      keycloakId: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstName?: string;
      lastName?: string;
      userType?: string;
    };
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    keycloakId?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: "RefreshAccessTokenError";
  }
}