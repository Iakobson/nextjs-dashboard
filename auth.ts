// auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// `credentials` is used to generate form on sign in page
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

// function that queries the user from the database
async function getUser(email:string):Promise<User|undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};
// this file spreads our authConfig object
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // array where we list different login options such as Google or GitHub
  providers: [Credentials({
    // to handle the authentication logic
    async authorize(credentials) {
	  // validate email and password before checking if user exists in database
      const parsedCredentials = z
        .object({ email:z.string().email(), password:z.string().min(6) })
        .safeParse(credentials);
		
	  if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
		  // queries the user from database
          const user = await getUser(email);
          if (!user) return null;
		  // to check if the passwords match
		  const passwordsMatch = await bcrypt.compare(password, user.password);
		  if (passwordsMatch) return user;
      }
	  // to prevent user from logging in
	  console.log('Invalid credentials');
      return null;			
    },
  })],
});
