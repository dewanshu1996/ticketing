import {
  Listner,
  OrderCancelledEvent,
  OrderCreatedEvent,
  Subjects,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Order } from "../model/order";

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = "payment-service";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
    });

    await order.save();

    msg.ack();
  }
}
