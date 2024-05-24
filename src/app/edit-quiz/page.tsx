import { api } from "~/trpc/server";
import AddQuiz from "./_components/AddQuiz";
import Container from "../_components/custom/ui/Container";
import Link from "next/link";

export default async function Page() {
  const data = await api.quiz.getQuizes();

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-start gap-3 px-3 pt-3">
      <AddQuiz />

      <div className="flex h-[85dvh] w-full flex-col items-center justify-start gap-2 overflow-y-auto">
        {data.map((i) => (
          <Link
            href={`/quiz/${i.id}`}
            key={i.id}
            className="w-full
          "
          >
            <Container>
              <p className="w-full px-3">{i.name}</p>
            </Container>
          </Link>
        ))}
      </div>
    </div>
  );
}
