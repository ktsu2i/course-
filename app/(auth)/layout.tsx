export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-full">{children}</main>
    </>
  );
}
