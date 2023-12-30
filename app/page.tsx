import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <p className="text-center mt-5">You are a coordinator.</p>
      <div className="mt-10 grid gap-5 justify-center">
        <Link href="/cancellation">
          <Button variant="temple">Cancel a course</Button>
        </Link>
        <Link href="/management">
          <Button variant="temple">Add/Update/Delete a course</Button>
        </Link>
        <Link href="/report">
          <Button variant="temple">Check all the courses</Button>
        </Link>
      </div>
    </>
  );
}
