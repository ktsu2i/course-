import { auth } from "@/auth";

export default async function getCurrentUser() {
  try {
    const session = await auth();
    const user = session?.user;

    return user;
  } catch (error) {
    return null;
  }
}
