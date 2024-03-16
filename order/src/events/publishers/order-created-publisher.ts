import { Publisher, OrderCreatedEvent, Subjects } from "@dewanshu1996/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
