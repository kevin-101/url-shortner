import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export default async function LoginButton() {
  const session = await auth();

  return session?.user ? (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button size="lg" type="submit">
        Logout
      </Button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";

        await signIn("google");
      }}
    >
      <Button size="lg" type="submit">
        Login
      </Button>
    </form>
  );
}
