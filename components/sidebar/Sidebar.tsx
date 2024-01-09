"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/sign");

  return (
    <div
      className={`h-full bg-white w-64 fixed inset-y-0 z-50 border-r shadow-sm ${
        isAuthPage && "hidden"
      }`}
    >
      <div className="font-semibold text-lg border-b shadow-sm">
        <a href="/" className="flex p-4 ml-2">
          <Image width={120} height={120} alt="logo" src="/logo.svg" />
        </a>
      </div>
      <div className="flex flex-col w-full mt-10">
        <SidebarRoutes />
      </div>
    </div>
  );
};
 
export default Sidebar;