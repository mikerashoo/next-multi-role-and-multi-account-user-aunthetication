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

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>; 