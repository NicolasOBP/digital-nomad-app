import { DateISO8601 } from "../types";

export type AuthUser = {
  fullname: string;
  email: string;
  id: string;
  createdAt: DateISO8601;
};
