import Link from "next/link";
import { SignedIn, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import TuidAlert from "@/components/TuidAlert";
import Navbar from "@/components/Navbar";

import getCurrentUserFromDb from "./actions/getCurrentUserFromDb";

export default async function Home() {
  const currentUser1 = await getCurrentUserFromDb();
  
  const hasRegistered = currentUser1 !== null;
  const isAdmin = currentUser1?.isAdmin;
  const isCoordinator = currentUser1?.isCoordinator;
  const isFaculty = currentUser1?.isFaculty;
  const isStaff = currentUser1?.isStaff;
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
        <Button
          disabled={!hasRegistered || (!isAdmin && !isCoordinator)}
          variant="temple"
        >
          <Link href="/management">
            Add/Update/Delete a course - coordinator
          </Link>
        </Button>
        <Button
          disabled={
            !hasRegistered || (!isAdmin && !isCoordinator && !isFaculty)
          }
          variant="temple"
        >
          <Link href="/cancellation">
            Cancel a class - coordinator & faculty
          </Link>
        </Button>
        <Button
          disabled={!hasRegistered || (!isAdmin && !isStaff)}
          variant="temple"
        >
          <Link href="/reports">Check all the courses & users - staff</Link>
        </Button>

        {/* <Link href="/profile/update">
          <Button>Update</Button>
        </Link> */}
      </div>
    </>
  );
}
