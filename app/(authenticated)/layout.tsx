import ToasterProvider from "@/components/providers/ToasterProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToasterProvider />
      <Navbar />
      <Sidebar />
      <main className="pl-64 h-full">{children}</main>
    </>
  );
}
