import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="p-4 border-b flex justify-between bg-white shadow-sm">
      <div className="font-semibold text-lg">
        <a href="/">
          <Image
            width={120}
            height={120}
            alt="logo"
            src="/logo.svg"
          />
        </a>
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};
 
export default Navbar;