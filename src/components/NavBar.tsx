import LoginButton from "./LoginButton";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-10 md:px-80 py-2 border border-b-2">
      <h1 className="text-2xl font-bold">Shorten</h1>

      <LoginButton />
    </div>
  );
}
