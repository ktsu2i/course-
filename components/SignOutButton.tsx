"use client";

import { signOut } from "@/app/actions/signOut";

import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <Button size="sm" variant="temple" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
