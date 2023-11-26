import { Subjects } from "./subject";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    price: number;
    version: number;
    orderId?: string;
  };
}
