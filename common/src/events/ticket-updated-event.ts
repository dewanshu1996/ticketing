import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  subject: Subjects.OrderUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
