import { CalendarX2, GraduationCap, Table, Users } from "lucide-react";
import SidebarItem from "./SidebarItem";

const routes = [
  {
    icon: Users,
    label: "Users",
    href: "/user-management",
  },
  {
    icon: GraduationCap,
    label: "Courses",
    href: "/course-management",
  },
  {
    icon: CalendarX2,
    label: "Cancellation",
    href: "/cancellation"
  },
  {
    icon: Table,
    label: "Reports",
    href: "/reports"
  }
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
 
export default SidebarRoutes;