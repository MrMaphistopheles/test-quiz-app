import { api } from "~/trpc/server";
import AddQuestion from "../_components/AddQuestions";
import Container from "~/app/_components/custom/ui/Container";
import Link from "next/link";

export default async function Quiz({ params }: { params: { id: string } }) {
  const data = await api.quiz.getQuize({ id: params.id });
  const questions = await api.quiz.getQuestions({ id: params.id });

  return (
    <div className="flex h-[100dvh] w-full max-w-[25em] flex-col items-center justify-start gap-3 px-3 pt-3">
      <h1 className="text-2xl font-medium">{data?.name}</h1>

      <AddQuestion id={params.id} />
      <div className="flex h-[85dvh] w-full flex-col items-center justify-start gap-2 overflow-y-auto">
        {questions.map((i) => (
          <Link
            href={`/question/${i.id}`}
            key={i.id}
            className="w-full
          "
          >
            <Container>
              <p className="w-full px-3">{i.definition}</p>
            </Container>
          </Link>
        ))}
      </div>
    </div>
  );
}
