import { api } from "~/trpc/server";
import AddQuiz from "./_components/AddQuiz";
import Container from "../_components/custom/ui/Container";
import Link from "next/link";
import DeleteQuiz from "./_components/DeleteQuiz";

export default async function Page() {
  const data = await api.quiz.getQuizes();

  return (
    <div className="flex h-[100dvh] w-full max-w-[25em] flex-col items-center justify-start gap-3 px-3 pt-3">
      <AddQuiz />

      <div className="flex h-[85dvh] w-full flex-col items-center justify-start gap-2 overflow-y-auto">
        {data.map((i) => (
          <Container key={i.id}>
            <Link
              href={`/quiz/${i.id}`}
              className="w-full
          "
            >
              <p className="w-full px-3">{i.name}</p>
            </Link>
            <DeleteQuiz id={i.id} />
          </Container>
        ))}
      </div>
    </div>
  );
}
