import { Publisher, Subjects, TicketUpdatedEvent } from "@dewanshu1996/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
