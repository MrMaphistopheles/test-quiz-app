import React from "react";
import Container from "~/app/_components/custom/ui/Container";
import { api } from "~/trpc/server";
import AddAnswer from "../_components/AddAnswer";
import Status from "../_components/Status";
import Value from "../_components/Value";
import Edit from "../_components/Edit";
import Delete from "../_components/Delete";

export default async function Question({ params }: { params: { id: string } }) {
  const data = await api.quiz.getQuestion({ id: params.id });
  const answers = await api.quiz.getAnswers({ qid: params.id });
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-start gap-3 px-3 pt-3">
      <h1 className="text-2xl font-medium">{data?.definition}</h1>
      <AddAnswer qid={params.id} />
      <Value id={params.id} value={data?.value ?? 1} />
      <div className="flex w-full items-center justify-center gap-3">
        <Edit defaultQuestion={data?.definition ?? ""} id={params.id} />
        <Delete id={params.id} quizId={data?.quizId ?? ""} />
      </div>

      <div className="flex h-[85dvh] w-full flex-col items-center justify-start gap-2 overflow-y-auto">
        {answers.map((i) => (
          <Container key={i.id}>
            <p className="w-full px-3">{i.definition}</p>
            <Status status={i.status} id={i.id} />
          </Container>
        ))}
      </div>
    </div>
  );
}
