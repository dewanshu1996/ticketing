import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    price: number;
    version: number;
  };
}
