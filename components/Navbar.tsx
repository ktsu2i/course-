"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/sign");

  return (
    <div className={`fixed top-0 left-0 right-0 p-4 border-b flex justify-between bg-white shadow-sm h-[65px] z-50 ${isAuthPage && "hidden"}`}>
      <div className="font-semibold text-lg">
        <a href="/">
          <Image width={120} height={120} alt="logo" src="/logo.svg" />
        </a>
      </div>
      <SignedOut>
        <Button variant="temple">
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default Navbar;