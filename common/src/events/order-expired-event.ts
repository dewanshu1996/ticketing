import { Subjects } from "./subject";

export interface OrderExpiredEvent {
  subject: Subjects.OrderExpired;
  data: {
    orderId: string;
  };
}
