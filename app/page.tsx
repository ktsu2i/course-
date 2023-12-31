import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();
  const metadata = user?.publicMetadata;
  const role = user?.publicMetadata?.role as string;

  return (
    <>
      <Navbar />
      <p className="text-xl text-center m-5">Your Role: {role}</p>
      {metadata?.hasRegistered ? (
        <div className="text-center">
          You have already registered TUID. Thank you!
        </div>
      ) : (
        <div className="flex p-2 justify-center">
          <div className="mr-5">Complete your profile from here</div>
          <Link href="/profile/register">
            <Button variant="temple">Complete your profile</Button>
          </Link>
        </div>
      )}
      <div className="mt-10 grid gap-5 justify-center">
        <Link href="/user-management">
          <Button variant="temple">Manage users - admin</Button>
        </Link>
        <Link href="/management">
          <Button variant="temple">Add/Update/Delete a course - coordinator</Button>
        </Link>
        <Link href="/cancellation">
          <Button variant="temple">Cancel a course - coordinator & faculty</Button>
        </Link>
        <Link href="/reports">
          <Button variant="temple">Check all the courses - staff</Button>
        </Link>
        <Link href="/profile/register">
          <Button>Register</Button>
        </Link>
        <Link href="/profile/update">
          <Button>Update</Button>
        </Link>
      </div>
    </>
  );
}
