import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  subject: Subjects.TicketDeleted;
  data: {
    id: string;
  };
}
