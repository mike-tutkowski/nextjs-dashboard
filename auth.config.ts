import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("'nextUrl' = " + nextUrl);

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log("Want to go to dashboard and logged in.");
          return true;
        }

        console.log("Want to go to dashboard, but not logged in.");
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("Did not specify dashboard, but logged in.");
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      console.log("Did not specify dashboard and not logged in.");
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
