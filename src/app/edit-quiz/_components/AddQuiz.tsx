"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "~/app/_components/custom/ui/Container";
import Add from "~/app/_components/svg/Add";
import { api } from "~/trpc/react";

export default function AddQuiz() {
  const router = useRouter();
  const [name, setName] = useState("");
  const { mutate, isPending } = api.quiz.addQuiz.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Container>
      <Input
        type="text"
        variant="flat"
        placeholder="Quiz name"
        alt="input quiz name"
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        isIconOnly
        color="primary"
        onClick={() => mutate({ name })}
        isLoading={isPending}
      >
        <Add color="white" />
      </Button>
    </Container>
  );
}
