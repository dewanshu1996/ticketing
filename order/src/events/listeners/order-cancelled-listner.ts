import {
  Subjects,
  OrderCancelledEvent,
  Listner,
  OrderExpiredEvent,
  OrderStatus,
} from "@dewanshu1996/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { natsWrapper } from "../../nats-init";

export class OrderExpiredListner extends Listner<OrderExpiredEvent> {
  subject: Subjects.OrderExpired = Subjects.OrderExpired;
  queueGroupName: string = "order-cancelled";

  async onMessage(data: { orderId: string }, msg: Message): Promise<void> {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new Error("Order id is not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    new OrderCancelledPublisher(natsWrapper._client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
