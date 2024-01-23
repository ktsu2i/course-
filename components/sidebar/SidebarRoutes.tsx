import { CalendarX2, GraduationCap, LayoutDashboard, Table, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";

const SidebarRoutes = () => {
  const pathname = usePathname();

  const routes = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: Users,
      label: "Users",
      href: "/user-management",
      active: pathname === "/user-management",
    },
    {
      icon: GraduationCap,
      label: "Courses",
      href: "/course-management",
      active: pathname.startsWith("/course-management"),
    },
    {
      icon: CalendarX2,
      label: "Cancellation",
      href: "/cancellation",
      active: pathname === "/cancellation",
    },
    {
      icon: Table,
      label: "Reports",
      href: "/reports",
      active: pathname.startsWith("/reports"),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          active={route.active}
        />
      ))}
    </div>
  );
}
 
export default SidebarRoutes;