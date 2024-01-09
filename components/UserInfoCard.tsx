import { User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoCardProps {
  currentUser: User | null;
};

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  currentUser,
}) => {
  const isAdmin = currentUser?.isAdmin;
  const isCoordinator = currentUser?.isCoordinator;
  const isFaculty = currentUser?.isFaculty;
  const isStaff = currentUser?.isStaff;
  const isGuest = !isAdmin && !isCoordinator && !isFaculty && !isStaff;

  let roleBadge;

  if (isAdmin) {
    roleBadge = <Badge className="bg-red-400/20 text-red-700">Admin</Badge>;
  } else if (isCoordinator) {
    roleBadge = <Badge className="bg-blue-400/20 text-blue-700">Coordinator</Badge>;
  } else if (isFaculty) {
    roleBadge = <Badge className="bg-green-400/20 text-green-700">Faculty</Badge>;
  } else if (isStaff) {
    roleBadge = <Badge className="bg-orange-400/20 text-orange-700">Staff</Badge>;
  } else {
    roleBadge = <Badge className="bg-gray-400/20 text-gray-700">Guest</Badge>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentUser?.fullName}</CardTitle>
        <div className="mt-2">{roleBadge}</div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-2">
          <div className="font-bold">TUID:</div>
          <div className="text-slate-600">{currentUser?.tuid}</div>
        </div>
        <div className="flex gap-x-2">
          <div className="font-bold">TUmail:</div>
          <div className="text-slate-600">{currentUser?.tuMail}</div>
        </div>
      </CardContent>
    </Card>
  );
}
 
export default UserInfoCard;