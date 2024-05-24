import { boolean, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  addQuiz: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.quiz.create({
        data: {
          name: input.name,
        },
      });
    }),

  deleteQuiz: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.quiz.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getQuizes: publicProcedure.query(({ ctx }) => {
    return ctx.db.quiz.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getQuize: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.quiz.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  addQuestion: publicProcedure
    .input(z.object({ def: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          definition: input.def,
          quizId: input.id,
        },
      });
    }),

  getQuestions: publicProcedure.query(({ ctx }) => {
    return ctx.db.question.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.question.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  changeValueOfQuestion: publicProcedure
    .input(z.object({ id: z.string(), value: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.update({
        where: {
          id: input.id,
        },
        data: {
          value: input.value,
        },
      });
    }),

  changeQuestion: publicProcedure
    .input(z.object({ id: z.string(), definition: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.update({
        where: {
          id: input.id,
        },
        data: {
          definition: input.definition,
        },
      });
    }),

  deleteQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAnswers: publicProcedure
    .input(z.object({ qid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.answer.findMany({
        where: {
          questionId: input.qid,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  addAnswers: publicProcedure
    .input(z.object({ definition: z.string(), qid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.answer.create({
        data: {
          definition: input.definition,
          questionId: input.qid,
        },
      });
    }),

  togleAnswersStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.answer.update({
        where: {
          id: input.id,
        },
        data: {
          status: !input.status,
        },
      });
    }),

  deleteAnswers: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.answer.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getQuestionForTest: publicProcedure
    .input(
      z.object({
        id: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const question = await ctx.db.question.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          quizId: input.id,
        },
        include: {
          Answer: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (question.length > input.limit) {
        const nextItem = question.pop();
        nextCursor = nextItem?.id;
      }

      let hasMore = true;
      if (nextCursor === undefined) {
        hasMore = false;
      }

      return { question, nextCursor, hasMore };
    }),
});
