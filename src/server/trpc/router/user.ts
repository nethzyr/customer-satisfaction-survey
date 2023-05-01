import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getUserBySession: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
});
