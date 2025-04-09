import NextAuth, { DefaultSession } from "next-auth";

import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || "",
      clientSecret: process.env.KEYCLOAK_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "keycloak") {
        try {
          // Register user in Spring Boot backend
          const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              firstName: user.name?.split(' ')[0] || '',
              lastName: user.name?.split(' ')[1] || '',
              keycloakId: user.id
            }),
          });

          if (!response.ok) {
            console.error('Failed to register user in backend');
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0, // Convert to milliseconds
          refreshToken: account.refresh_token,
          keycloakId: user.id,
          user
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_ID || "",
            client_secret: process.env.KEYCLOAK_SECRET || "",
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken as string,
          }),
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          accessToken: tokens.access_token,
          accessTokenExpires: Date.now() + (tokens.expires_in * 1000),
          refreshToken: tokens.refresh_token ?? token.refreshToken,
        };
      } catch (error) {
        console.error('Error refreshing access token', error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }) {
      if (token.error) {
        // Handle the error - you might want to sign the user out
        // or show a message to re-authenticate
        return {
          ...session,
          error: token.error,
        };
      }

      if (session.user) {
        session.user.keycloakId = token.keycloakId as string;
        session.accessToken = token.accessToken as string;
        
        try {
          // Fetch additional user data from Spring Boot backend
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/user/${token.keycloakId}`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );
          
          if (response.ok) {
            const userData = await response.json();
            session.user = {
              ...session.user,
              ...userData
            };
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };