import { api } from "~/trpc/server";
import Container from "./_components/custom/ui/Container";
import Link from "next/link";

export default async function Home() {
  const data = await api.quiz.getQuizes();
  return (
    <div className="flex h-[100dvh] w-full max-w-[25em] flex-col items-center justify-start gap-3 px-3 pt-3">
      {data.map((q) => (
        <Link href={`start/${q.id}`} key={q.id} className="w-full">
          <Container>
            <p className="w-full px-2">{q.name}</p>
          </Container>
        </Link>
      ))}
    </div>
  );
}
