import {
  Listner,
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Order } from "../model/order";

export class OrderCancelledListner extends Listner<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = "payment-service";

  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    msg.ack();
  }
}
