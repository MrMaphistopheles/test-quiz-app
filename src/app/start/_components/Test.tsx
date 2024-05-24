"use client";

import { Button, Checkbox } from "@nextui-org/react";
import { useState } from "react";
import Container from "~/app/_components/custom/ui/Container";
import { api } from "~/trpc/react";

export default function Test({ quizId }: { quizId: string }) {
  const [page, setPage] = useState(0);
  const { data, fetchNextPage } = api.quiz.getQuestionForTest.useInfiniteQuery(
    {
      limit: 1,
      id: quizId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnMount: false,
    },
  );

  const handleNext = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };
  return (
    <div className="flex h-[100dvh] w-full max-w-[25em] flex-col items-center justify-between gap-3 px-3 pt-3">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="pb-5 pt-10 text-xl font-medium">
          {data?.pages[page]?.question[0]?.definition}
        </p>

        {data?.pages[page]?.question[0]?.Answer.map((ans) => (
          <Container justify="flex-start" key={ans.id}>
            <Checkbox defaultSelected={false} className="w-full">
              {ans.definition}
            </Checkbox>
          </Container>
        ))}
      </div>

      <div className="">
        <Button onClick={handleNext} color="success">
          Next
        </Button>
      </div>
    </div>
  );
}
