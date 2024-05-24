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
});
