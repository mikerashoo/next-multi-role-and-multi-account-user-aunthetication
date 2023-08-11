import NextAuth, { DefaultSession, JWT, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User,
    accounts: Account[]
  }
  interface User extends DefaultUser {
      userId: string;
      role: string;
      isAdmin: boolean;
      isUser: boolean;
      accounts: Account[]

  }  
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: string;
    isAdmin: boolean;
    isUser: boolean;
    accounts: Account[]

  }
}


// Utility type to replace the return type of a function
export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;

// Flattened zod error
export type FlattenedZodError = typeToFlattenedError<any, string>

// This obscure type is taken from TrpcErrorShape, and extends the data property with "inputValidationError"
export type CustomErrorShape = TRPCErrorShape<
  TRPC_ERROR_CODE_NUMBER,
  Record<string, unknown> & { inputValidationError: FlattenedZodError | null }
>

// This type extends the errorFormatter property with the custom error shape
export type CustomErrorFormatter = ReplaceReturnType<RuntimeConfig<any>['errorFormatter'], CustomErrorShape>;
