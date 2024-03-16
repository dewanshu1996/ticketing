import {
  Listner,
  OrderCancelledEvent,
  OrderCreatedEvent,
  Subjects,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";

export class OrderCancelledListner extends Listner<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = "order-cancel";

  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Invalid ticket Id");
    }

    ticket.set({ orderId: null });

    await ticket.save();

    msg.ack();
  }
}
