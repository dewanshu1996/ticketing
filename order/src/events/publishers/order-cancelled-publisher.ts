import { Publisher, OrderCancelledEvent, Subjects } from "@dewanshu1996/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
