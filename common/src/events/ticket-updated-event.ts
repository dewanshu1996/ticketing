import { Subjects } from "./subject";

export interface TicketUpdatedEvent {
  subject: Subjects.OrderUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
