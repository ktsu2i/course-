import "./globals.css";

import ToasterProvider from "@/components/providers/ToasterProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
