import { Publisher, OrderExpiredEvent, Subjects } from "@dewanshu1996/common";

export class OrderExpiredPublisher extends Publisher<OrderExpiredEvent> {
  subject: Subjects.OrderExpired = Subjects.OrderExpired;
}
