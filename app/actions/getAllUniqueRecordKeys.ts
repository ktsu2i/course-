import { db } from "@/lib/db";

export default async function getAllUniqueRecordKeys() {
  try {
    const groupedRecordKeys = await db.course.groupBy({
      by: ["recordKey"],
    });

    const recordKeys = groupedRecordKeys.map((group) => group.recordKey);

    return recordKeys;
    
  } catch {
    return [];
  }
}