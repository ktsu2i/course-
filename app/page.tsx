import Link from "next/link";

import { Button } from "@/components/ui/button";

import TuidAlert from "@/components/TuidAlert";
import Navbar from "@/components/Navbar";

import getCurrentUserFromDb from "./actions/getCurrentUserFromDb";
import { SignedIn } from "@clerk/nextjs";

export default async function Home() {
  const currentUser = await getCurrentUserFromDb();
  
  const hasRegistered = currentUser !== null;
  const isAdmin = currentUser?.isAdmin;
  const isCoordinator = currentUser?.isCoordinator;
  const isFaculty = currentUser?.isFaculty;
  const isStaff = currentUser?.isStaff;
  const hasNoRoles = !isAdmin && !isCoordinator && !isFaculty && !isStaff;

  let role;

  if (isAdmin) {
    role = "Admin";
  } else if (isCoordinator) {
    role = "Coordinator";
  } else if (isFaculty) {
    role = "Faculty";
  } else if (isStaff) {
    role = "Staff";
  } else {
    role = "Guest";
  }

  let alertContent;

  if (hasRegistered) {
    if (hasNoRoles) {
      alertContent = (
        <>
          <div className="text-bold text-center">
            Your Role: ---
          </div>
          <div className="text-slate-600 text-center">
            Please wait until the coordinator adds your role.
          </div>
        </>
      );
    } else {
      alertContent = (
        <div className="text-bold text-center">
          Your Role: {role}
        </div>
      );
    }
  } else {
    alertContent = (
      <SignedIn>
        <TuidAlert />
      </SignedIn>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto pt-[85px]">{alertContent}</div>
      <div className="mt-10 grid gap-5 justify-center my-auto">
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
