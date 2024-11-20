import { parse } from "date-fns";

export const convertDate = (inputDate) => {
  const parsedDate = parse(inputDate, "yyyy-MM-dd", new Date());
  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate.toISOString();
};
