import { OrderStatus } from "../types/order-status";
import { Subjects } from "./subject";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    expired: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
