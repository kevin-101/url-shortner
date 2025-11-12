import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <NavBar />
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start"></main>
    </div>
  );
}
