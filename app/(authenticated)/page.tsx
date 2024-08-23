import { SignedIn } from "@clerk/nextjs";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import WelcomeCard from "@/components/WelcomeCard";
import UserInfoCard from "@/components/UserInfoCard";
import CourseTable from "@/components/CourseTable";

import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import getAllCourses from "../actions/getAllCourses";

export default async function Home() {
  const currentUser = await getCurrentUserFromDb();
  const courses = await getAllCourses();

  const hasRegistered = true;
  // const hasRegistered = currentUser !== null;
  // const isAdmin = session?.user.roles.includes("admin");
  // const isCoordinator = session?.user.roles.includes("coordinator");
  // const isFaculty = session?.user.roles.includes("faculty");
  // const isStaff = session?.user.roles.includes("staff");
  // const hasNoRoles = !isAdmin && !isCoordinator && !isFaculty && !isStaff;

  const hasNoRoles = false;

  let alertContent;

  if (hasRegistered) {
    if (hasNoRoles) {
      alertContent = (
        <>
          <div className="text-bold text-center">Your Role: ---</div>
          <div className="text-slate-600 text-center">
            Please wait until the coordinator adds your role.
          </div>
        </>
      );
    } else {
      alertContent = (
        <div className="text-bold text-center">
          {/* Your Role: {session?.user.roles[0]} */}
          Your Role: Test
        </div>
      );
    }
  } else {
    alertContent = (
      <SignedIn>
        <WelcomeCard />
      </SignedIn>
    );
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical" className="pt-[65px]">
            <ResizablePanel defaultSize={35} minSize={35}>
              <div className="m-10 bg-slate-0">
                <h1 className="text-3xl font-bold">
                  {/* Welcome Back, {session?.user.first_name}! */}
                  Welcome Back, Test!
                </h1>
                {/* <p className="text-slate-500 mt-1">
                  Manage your information and courses
                </p> */}
              </div>
              <div className="mx-10 max-w-[560px]">
                <UserInfoCard currentUser={currentUser} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
              <div className="m-10">
                <h1 className="text-2xl font-bold">Your Courses</h1>
                <CourseTable courses={courses} currentUser={currentUser} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
