"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Delete({ id, quizId }: { id: string; quizId: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.quiz.deleteQuestion.useMutation({
    onSuccess: () => {
      router.push(`/quiz/${quizId}`);
    },
  });
  return (
    <Button onClick={() => mutate({ id })} isLoading={isPending} color="danger">
      {isPending ? "Deleting..." : "Delete question"}
    </Button>
  );
}
