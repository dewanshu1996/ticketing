import { Publisher, Subjects, TicketDeletedEvent } from "@dewanshu1996/common";

export class TicketDeletePublisher extends Publisher<TicketDeletedEvent> {
  subject: Subjects.TicketDeleted = Subjects.TicketDeleted;
}
