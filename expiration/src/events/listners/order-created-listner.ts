import {
  Listner,
  OrderCancelledEvent,
  OrderCreatedEvent,
  Subjects,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../expiration-queue";

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = "order:created";

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: 1000 * 60 * 15,
      }
    );

    msg.ack();
  }
}
