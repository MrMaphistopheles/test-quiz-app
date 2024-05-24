"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "~/app/_components/custom/ui/Container";
import Add from "~/app/_components/svg/Add";
import { api } from "~/trpc/react";

export default function AddQuestion({ id }: { id: string }) {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const { mutate, isPending } = api.quiz.addQuestion.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  console.log(id);

  return (
    <Container>
      <Input
        type="text"
        variant="flat"
        placeholder="Quiz question"
        alt="input quiz question"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        isIconOnly
        color="primary"
        onClick={() => mutate({ def: question, id: id })}
        isLoading={isPending}
      >
        <Add color="white" />
      </Button>
    </Container>
  );
}
