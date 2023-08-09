/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure, privateProcedure } from "../trpc"; 
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/prisma";
import { signUpSchema } from "~/shared/validation/auth";
import { hash } from "argon2";
import { Prisma } from "@prisma/client";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true, 
  email: true, 
  name:true
});

export const userRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        initialCursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 20;
      const cursor = input.cursor ?? input.initialCursor;

      const items = await prisma.user.findMany({
        select: defaultUserSelect,
        // get an extra item to know if there's a next page
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        
      });
      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = items.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        items: items,
        nextCursor,
      };
    }),
  register: publicProcedure
    .input(
      signUpSchema
    )
    .mutation(async ({ input }) => {
        const { name, email, password } = input;

      const exists = await prisma.user.findUnique({
        where: { email },
      });

      if (exists) {
          throw new TRPCError({
              code: "CONFLICT",
              message: `User already exists.`,
            });
      
      }
    const hashedPassword = await hash(password);

      const user = await prisma.user.create({
        data: {  name, email, password: hashedPassword },
      });
    setTimeout(() => {
    return user;
      
    }, 200);

   
    
    }),
});
