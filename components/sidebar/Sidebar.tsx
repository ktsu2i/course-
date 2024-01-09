"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";

import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/sign");

  return (
    <div
      className={`h-full bg-white w-64 fixed inset-y-0 z-50 border-r shadow-sm ${
        isAuthPage ? "hidden" : ""
      }`}
    >
      <div className="font-semibold text-lg">
        <a href="/" className="flex p-6">
          <Image width={120} height={120} alt="logo" src="/logo.svg" />
        </a>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="absolute left-5 bottom-5">
        <SignedOut>
          <Button variant="temple">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};
 
export default Sidebar;