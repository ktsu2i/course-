import Navbar from "@/components/Navbar";
import ToasterProvider from "@/components/providers/ToasterProvider";
import { Sidebar } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToasterProvider />
      <Navbar />
      <Sidebar />
      <main className="pl-64 h-full">{children}</main>
    </>
  );
}
