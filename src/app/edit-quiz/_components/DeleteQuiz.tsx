"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Delete({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.quiz.deleteQuiz.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Button onClick={() => mutate({ id })} isLoading={isPending} color="danger">
      {isPending ? null : "Delete"}
    </Button>
  );
}
