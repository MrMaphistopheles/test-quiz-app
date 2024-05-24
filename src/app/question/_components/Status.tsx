"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Status({
  status,
  id,
}: {
  status: boolean;
  id: string;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.quiz.togleAnswersStatus.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Button
      color={status ? "success" : "danger"}
      onClick={() => mutate({ id, status })}
      isLoading={isPending}
    >
      {isPending ? null : JSON.stringify(status)}
    </Button>
  );
}
