import { NextResponse } from "next/server";
import KcAdminClient from "@keycloak/keycloak-admin-client";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const { username, email, firstName, lastName, password } =
      await request.json();

    const kcAdminClient = new KcAdminClient({
      baseUrl: "http://192.168.3.4:8080",
      realmName: "tuj",
    });

    const session = await auth();
    const accessToken = session?.user.access_token;

    if (!accessToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    kcAdminClient.setAccessToken(accessToken);

    const user = await kcAdminClient.users.create({
      realm: "tuj",
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
    });

    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.log("[Keycloak] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
