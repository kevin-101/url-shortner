import GenerateField from "@/components/GenerateField";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center">
      <main className="flex gap-10 w-full max-w-3xl flex-col items-center py-32 px-2 md:px-16 sm:items-start">
        <h1 className="text-4xl md:text-5xl text-center w-full font-extrabold">
          Enter any valid url!
        </h1>

        <GenerateField session={session} />
      </main>
    </div>
  );
}
