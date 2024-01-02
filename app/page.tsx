import Link from "next/link";

import { Button } from "@/components/ui/button";

import TuidAlert from "@/components/TuidAlert";
import Navbar from "@/components/Navbar";

import getCurrentUserFromDb from "./actions/getCurrentUserFromDb";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Home() {
  const currentUser = await getCurrentUserFromDb();
  
  const hasRegistered = currentUser !== null;
  const isAdmin = currentUser?.isAdmin;

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto mt-[85px]">
        {hasRegistered ? (
          <div className="text-bold text-center">
            Thank you for the registration!
          </div>
        ) : (
          <SignedIn>
            <TuidAlert />
          </SignedIn>
        )}
      </div>
      <div className="mt-10 grid gap-5 justify-center">
        <Button disabled={!hasRegistered || !isAdmin} variant="temple">
          <Link href="/user-management">Manage users - admin</Link>
        </Button>
        <Button disabled={!hasRegistered || !isAdmin} variant="temple">
          <Link href="/management">
            Add/Update/Delete a course - coordinator
          </Link>
        </Button>
        <Button disabled={!hasRegistered || !isAdmin} variant="temple">
          <Link href="/cancellation">
            Cancel a class - coordinator & faculty
          </Link>
        </Button>
        <Button disabled={!hasRegistered || !isAdmin} variant="temple">
          <Link href="/reports">Check all the courses & users - staff</Link>
        </Button>

        <Link href="/profile/update">
          <Button>Update</Button>
        </Link>
      </div>
    </>
  );
}
