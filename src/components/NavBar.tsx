import LoginButton from "./LoginButton";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-5 xl:px-80 py-2 md:py-3 border-b">
      <h1 className="text-3xl font-bold">Shorten</h1>

      <LoginButton />
    </div>
  );
}
