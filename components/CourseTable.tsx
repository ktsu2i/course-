"use client";

import { Course, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

interface CourseTableProps {
  courses: Course[];
  currentUser: User | null;
};

const departments = [
  { label: "Accounting", value: "acct" },
  { label: "Advertising", value: "adv" },
  { label: "Anthropology", value: "anth" },
  { label: "Architecture", value: "arch" },
  { label: "Art", value: "artu" },
  { label: "Art History", value: "arth" },
  { label: "Asian Studies", value: "asst" },
  { label: "Biology", value: "biol" },
  { label: "Chemistry", value: "chem" },
  { label: "Chinese", value: "chi" },
  { label: "Communication Studies", value: "cmst" },
  { label: "Communication and Social Influence", value: "csi" },
  { label: "Computer & Information Science", value: "cis" },
  { label: "Dance", value: "danc" },
  { label: "Economics", value: "econ" },
  { label: "Education", value: "educ" },
  { label: "English", value: "eng" },
  { label: "Environmental Studies", value: "enst" },
  { label: "French", value: "fren" },
  { label: "Gender, Sexuality and Women Studies", value: "gsws" },
  { label: "Geography and Urban Studies", value: "gus" },
  { label: "History", value: "hist" },
  { label: "Human Resource Management", value: "hrm" },
  { label: "Intellectual Heritage", value: "ih" },
  { label: "International Bus Studies", value: "jibs" },
  { label: "Japanese", value: "jpns" },
  { label: "Journalism", value: "jrn" },
  { label: "Klein", value: "kln" },
  { label: "Korean", value: "krn" },
  { label: "Law (Undergraduate)", value: "lawu" },
  { label: "LGBT Studies", value: "lgbt" },
  { label: "Liberal Arts", value: "cla" },
  { label: "Management Information Systems", value: "mis" },
  { label: "Marketing", value: "mktg" },
  { label: "Mathematics", value: "math" },
  { label: "Media Studies & Production", value: "msp" },
  { label: "Music Studies", value: "must" },
  { label: "Philosophy", value: "phil" },
  { label: "Physical Activity", value: "actv" },
  { label: "Physics", value: "phys" },
  { label: "Political Science", value: "pols" },
  { label: "Psychology", value: "psy" },
  { label: "Religion", value: "rel" },
  { label: "Risk Management and Insurance", value: "rmi" },
  { label: "Sociology", value: "soc" },
  { label: "Spanish", value: "span" },
  { label: "Sport Tourism Hospitality management", value: "sthm" },
  { label: "Sports & Recreation Management", value: "srm" },
  { label: "Statistics", value: "stat" },
  { label: "Temple University Japan", value: "tuj" },
  { label: "Theater", value: "thtr" },
  { label: "Tourism and Hospitality Management", value: "thm" },
  { label: "University Seminar", value: "unvs" },
];

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  currentUser,
}) => {
  const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const departmentInShort = row.getValue("department") as string;
      const department = departments.find(
        (department) => department.value === departmentInShort
      );

      return department?.label;
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course (section)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dayAndTime",
    header: "Day & Time",
  },
  {
    accessorKey: "crn",
    header: "CRN",
  },
  {
    accessorKey: "specialInfo",
    header: "Special Info",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => {
      const semester = row.getValue("semester") as string;
      const capitalizedSemester = semester.charAt(0).toUpperCase() + semester.slice(1);

      return capitalizedSemester;
    },
  },
  {
    accessorKey: "year",
    accessorFn: (row) => row.year.toString(),
    header: "Year",
  },
  ];
  
  const myCourses = courses.filter((course) => course.userId === currentUser?.id);

  return <DataTable columns={columns} data={myCourses} />;
}
 
export default CourseTable;