import { User } from "./user.model";

export interface Debt {
  id?: number;
  idUser: number;
  userName?: string;
  reason: string;
  date: string;
  value: number;
  user?: User;
}
