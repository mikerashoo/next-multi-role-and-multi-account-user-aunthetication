import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "~/server/prisma";

import { loginSchema } from "./validation/auth";
import { TRPCError } from "@trpc/server";
import { CREDIENTIAL_ERROR } from "~/utils/constants/apiErrorResponses";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        
          const { email, password } = await loginSchema.parseAsync(credentials);  

          const result = await prisma.user.findFirst({
            where: { email },
            include: {accounts: true}
          });

          if (!result) {  throw new TRPCError({
            code: "NOT_FOUND",
            message: CREDIENTIAL_ERROR,
          })}

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword)  {
            throw new TRPCError({
              code: "NOT_FOUND",
              message:  CREDIENTIAL_ERROR,
            });
          } 
          return { id: result.id, email, name: result.name, role: result.role, accounts: result.accounts} as any;
       
      },
    }),
  ],
  
  callbacks: {
    
    jwt: async ({ token, user, session, trigger }) => {
      
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name; 
        token.role = user.role;
        token.isAdmin = user.role == 'admin';
        token.isUser = user.role == 'user';
        token.accounts = user.accounts;

      }

      if(trigger === 'update') {
        if(session.accounts) {
          token.accounts = session.accounts;
        }
      }

      
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.isAdmin = token.role == 'admin';
        session.user.isUser = token.role == 'user';
        session.accounts = token.accounts
      }
   
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/login'
  },

  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  }
};