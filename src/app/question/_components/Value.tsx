"use client";

import { Slider } from "@nextui-org/react";
import { api } from "~/trpc/react";

export default function Value({ value, id }: { value: number; id: string }) {
  const { mutate, isPending } = api.quiz.changeValueOfQuestion.useMutation();

  const handleChange = (v: number | number[]) => {
    if (typeof v === "number") {
      mutate({ id, value: v });
    }
  };

  return (
    <Slider
      size="md"
      step={1}
      color="primary"
      label="Question value"
      showSteps={true}
      maxValue={5}
      minValue={1}
      defaultValue={value}
      className="max-w-md"
      isDisabled={isPending}
      onChangeEnd={(v) => handleChange(v)}
    />
  );
}
