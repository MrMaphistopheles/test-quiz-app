import Test from "../_components/Test";

export default function Start({ params }: { params: { id: string } }) {
  return <Test quizId={params.id} />;
}
