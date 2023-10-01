import { Subjects } from "./subject";

export interface TicketDeletedEvent {
  subject: Subjects.TicketDeleted;
  data: {
    id: string;
  };
}
