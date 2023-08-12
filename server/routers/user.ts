/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure, privateProcedure } from "../trpc"; 
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/prisma";
import { deleteAccountSchema, linkAccountSchema, signUpSchema } from "~/shared/validation/auth";
import { hash } from "argon2";
import { Prisma } from "@prisma/client";
import { AccountType } from "~/utils/constants/userRoles";

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
    // REGISTER END-POINT
  register: publicProcedure
    .input(
      signUpSchema
    )
    .mutation(async ({ input }) => {
        const { name, email, password, } = input;

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
        
      
    return user;
     
    }),

    // LINK ACCOUNT END-POINT
    linkToAccount: publicProcedure
    .input(
      linkAccountSchema
    )
    .mutation(async ({ input }) => {
        const { userId, accountType, name } = input;

        const exists = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!exists) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `User doesn't exists.`,
              });
        
        } 

        const accountExists = await prisma.account.findFirst({
          where: { type: accountType, userId: userId },
        });
        
        if (accountExists) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Account already exists.`,
              });
        
        } 
          
        const account = await prisma.account.create({
          data: {type: accountType, userId, name }
        })
        return account;
     
    }),

    deleteAccount: publicProcedure
    .input(
      deleteAccountSchema
    )
    .mutation(async ({ input }) => {
       
        const { userId, accountId } = input;

        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!userExists) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `User doesn't exists.`,
              });
        
        } 
        const accountExists = await prisma.account.findUnique({
          where: { id: accountId, userId: userId },
        });
        
        if (!accountExists) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Account doesn't exists.`,
              });
        
        }
          
        const deleted = await prisma.account.delete({
          where: {id: accountId}
        })
      return deleted;
     
    }),
});
