import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const NthQuestion: NextPage = () => {
  const router = useRouter();
  const { index } = router.query;
  const parsedIndex = Number(index);
  const { data, isLoading, error } = trpc.question.getByIndex.useQuery(
    { index: parsedIndex },
    { enabled: typeof index === "string" }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1>{data?.result?.text}</h1>

      <div className="flex flex-wrap justify-center gap-6 py-6">
        {data?.result?.answers.map((answer) => (
          <div key={answer.id}>
            <button className="rounded-full bg-blue-500/10 px-10 py-3 font-semibold text-blue-600 no-underline transition hover:bg-white/20">
              {answer.text}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-between">
        <button
          className="rounded-full bg-blue-500/10 px-10 py-3 font-semibold text-blue-600 no-underline transition hover:bg-white/20"
          disabled={parsedIndex === 1}
          onClick={() => router.push(`/question/${parsedIndex - 1}`)}
        >
          Previous
        </button>

        <button
          className="rounded-full bg-blue-500/10 px-10 py-3 font-semibold text-blue-600 no-underline transition hover:bg-white/20"
          disabled={!data.nextIndex}
          onClick={() => router.push(`/question/${parsedIndex + 1}`)}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default NthQuestion;
