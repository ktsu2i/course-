import Image from "next/image";

import { auth } from "@/auth";
import { SignIn } from "./auth/SignIn";

const Navbar = async () => {
  // const pathname = usePathname();
  // const isAuthPage = pathname?.startsWith("/sign");

  const session = await auth();

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-4 border-b flex justify-between bg-white shadow-sm h-[65px] z-50 ${
        false && "hidden"
      }`}
    >
      <div className="font-semibold text-lg">
        <a href="/">
          <Image width={120} height={120} alt="logo" src="/logo.svg" />
        </a>
      </div>
      <div className={`${session?.user && "hidden"}`}>
        <SignIn />
      </div>
      <div className={`${!session?.user && "hidden"}`}>
        {session?.user?.name}
      </div>
    </div>
  );
};

export default Navbar;
