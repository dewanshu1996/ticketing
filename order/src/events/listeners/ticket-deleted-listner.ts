import {
  Subjects,
  TicketCreatedEvent,
  Listner,
  TicketDeletedEvent,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";

export class TicketDeletedListner extends Listner<TicketDeletedEvent> {
  subject: Subjects.TicketDeleted = Subjects.TicketDeleted;
  queueGroupName: string = "ticket-delete";

  async onMessage(data: { id: string }, msg: Message): Promise<void> {
    const { id } = data;

    await Ticket.findByIdAndDelete(id);

    msg.ack();
  }
}
