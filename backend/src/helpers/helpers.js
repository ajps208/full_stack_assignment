import { customAlphabet } from "nanoid";
// Generate unique ID
export const generateNumericId = customAlphabet("0123456789", 10);


// Format DOB as DD/MM/YYYY
export const formatDOB = (date) => {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};