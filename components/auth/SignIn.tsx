import { signIn } from "@/auth";
import { Button } from "../ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <Button variant="temple">Sign in</Button>
    </form>
  );
}
