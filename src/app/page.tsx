import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center">
      <NavBar />

      <main className="flex gap-10 w-full max-w-3xl flex-col items-center py-32 px-2 md:px-16 sm:items-start">
        <h1 className="text-4xl md:text-5xl text-center w-full font-extrabold">
          Enter any valid url!
        </h1>

        <div className="flex gap-2 w-full items-center">
          <Input type="text" placeholder="eg: google.com" className="h-12" />
          <Button variant="outline" className="h-12">
            Generate
          </Button>
        </div>
      </main>
    </div>
  );
}
