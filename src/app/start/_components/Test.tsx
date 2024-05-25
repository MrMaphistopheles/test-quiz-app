"use client";

import { Button, Checkbox } from "@nextui-org/react";
import { useState } from "react";
import Container from "~/app/_components/custom/ui/Container";
import useFakeUser from "~/app/_hooks/useFakeUser";
import { api } from "~/trpc/react";

export default function Test({ quizId }: { quizId: string }) {
  const [page, setPage] = useState(0);
  const [value, setValue] = useState<string[]>([]);

  const { key } = useFakeUser();

  const { mutate, isPending } = api.quiz.record.useMutation({
    onSuccess: () => {
      setValue([]);
    },
  });

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
    checkAnswers();
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const checkAnswers = () => {
    const answers = data?.pages[page]?.question[0]?.Answer.map((i) => i);
    const question = data?.pages[page]?.question[0];
    const answersIsTrue = answers?.reduce((acc: string[], ans) => {
      if (ans.status) {
        acc.push(ans.id);
      }

      return acc;
    }, []);

    const isTrue = () => {
      if (answersIsTrue?.length !== value.length) return false;

      const sortedAns = JSON.stringify(answersIsTrue.slice().sort());
      const sortedValue = JSON.stringify(value.slice().sort());
      return sortedAns === sortedValue;
    };

    const istrue = isTrue();

    mutate({
      isTrue: istrue,
      quizId: quizId,
      qId: question?.id ?? "",
      userId: key,
      ansIds: value,
    });
  };

  const handleChange = (val: string) => {
    setValue((prev) => {
      const exist = prev?.find((i) => i === val);

      if (exist) return prev?.filter((i) => i !== val);

      return [...prev, val];
    });
  };

  return (
    <div className="flex h-[100dvh] w-full max-w-[25em] flex-col items-center justify-between gap-3 px-3 pt-3">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="pb-5 pt-10 text-xl font-medium">
          {data?.pages[page]?.question[0]?.definition}
        </p>

        {data?.pages[page]?.question[0]?.Answer.map((ans) => (
          <Container justify="flex-start" key={ans.id}>
            <Checkbox
              defaultSelected={false}
              className="w-full"
              value={ans.id}
              onChange={(e) => handleChange(e.target.value)}
            >
              {ans.definition}
            </Checkbox>
          </Container>
        ))}
      </div>

      <div className="flex w-full items-center justify-end gap-2 py-5">
        <Button
          size="lg"
          onClick={handleNext}
          color="success"
          className="text-white"
          isLoading={isPending}
        >
          {isPending ? "Loadig..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
