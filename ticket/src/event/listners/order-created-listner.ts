import {
  BadError,
  Listner,
  OrderCancelledEvent,
  OrderCreatedEvent,
  Subjects,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = "order-created";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    console.log(data);

    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new BadError("Invalid ticket Id");
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    msg.ack();
  }
}
