import { Subjects, TicketCreatedEvent, Listner } from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "ticket-created";

  async onMessage(
    data: { id: string; price: number; title: string },
    msg: Message
  ): Promise<void> {
    const { id, price, title } = data;

    const ticket = Ticket.build({
      id: id,
      price: price,
      title: title,
    });

    await ticket.save();

    msg.ack();
  }
}
