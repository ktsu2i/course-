import { ArrowUpFromLine } from "lucide-react";
// import * as xlsx from "xlsx";

import { Button } from "./ui/button";
import { Course } from "@/lib/types";

interface ExportButtonProps {
  courses: Course[];
};

const ExportButton: React.FC<ExportButtonProps> = ({
  courses,
}) => {
  // const handleDownload = (courses: Course[]) => {
  //   const workbook = xlsx.utils.book_new();
  //   const worksheet = xlsx.utils.json_to_sheet(courses);

  //   xlsx.utils.book_append_sheet(workbook, worksheet, "Courses");
  //   xlsx.writeFile(workbook, "courses.xlsx");
  // };

  return (
    // <Button size="sm" variant="temple" onClick={() => handleDownload(courses)}>
    <Button size="sm" variant="temple">
      <ArrowUpFromLine className="h-4 w-4 mr-1" />
      Export
    </Button>
  );
}
 
export default ExportButton;