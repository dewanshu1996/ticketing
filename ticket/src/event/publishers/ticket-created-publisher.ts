import { Publisher, Subjects, TicketCreatedEvent } from "@dewanshu1996/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
