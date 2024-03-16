import {
  Subjects,
  TicketCreatedEvent,
  Listner,
  TicketUpdatedEvent,
  NotFoundError,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";

export class TicketUpdatedListner extends Listner<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = "ticket-update";

  async onMessage(
    data: { id: string; price: number; version: number },
    msg: Message
  ): Promise<void> {
    const { price, id } = data;

    const ticket = await Ticket.findOne({
      id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new NotFoundError();
    }

    ticket.set({ price });
    await ticket.save();

    msg.ack();
  }
}
