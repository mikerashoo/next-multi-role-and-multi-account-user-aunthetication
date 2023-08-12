/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from "../trpc"; 
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter, 
  whoami: publicProcedure.query(({ ctx }) => ctx.user),
  secret: privateProcedure.query(() => "cow level"),
});

export type AppRouter = typeof appRouter;
