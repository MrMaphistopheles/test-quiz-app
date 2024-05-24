"use client";

import { api } from "~/trpc/react";

export default function Start({ params }: { params: { id: string } }) {
  const { data, fetchNextPage } = api.quiz.getQuestionForTest.useInfiniteQuery(
    {
      limit: 1,
      id: params.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnMount: false,
    },
  );

  console.log(data);

  return <div>{params.id}</div>;
}
