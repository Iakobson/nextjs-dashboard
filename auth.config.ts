// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // to specify route for custom sign-in, sign-out, and error pages
  pages: {
    // user will be redirected to custom login page
    signIn: '/auth/login',
  },
  // logic to protect your routes
  callbacks: {
    // used to verify if request is authorized to access page via Next.js Middleware
    // it is called before a request is completed
	authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
	  // prevent users from accessing dashboard pages unless they are logged in
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // add providers with an empty array for now
} satisfies NextAuthConfig;
