import * as z from "zod";
import { AccountType } from "~/utils/constants/userRoles";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
});

export const signUpSchema = loginSchema.extend({
  name: z.string(), 
  accountType: z.string(),
});

export const linkAccountSchema = z.object({
  userId: z.string(),
  accountType: z.string(),
});


export const deleteAccountSchema = z.object({
  userId: z.string(),
  accountId: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>; 
export type IAccountLink = z.infer<typeof linkAccountSchema>;
export type IDeleteAccountLink = z.infer<typeof deleteAccountSchema>;
