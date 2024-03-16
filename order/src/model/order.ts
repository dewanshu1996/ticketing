import mongoose from "mongoose";
import { OrderStatus } from "@dewanshu1996/common";
import { TicketDoc } from "../model/ticket";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderInterface {
  userId: string;
  status: OrderStatus;
  expired: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expired: Date;
  ticket: TicketDoc;
  version: number;
}

interface OrderModel extends mongoose.Model<any> {
  build(order: OrderInterface): OrderDoc;
  toJSON(): OrderDoc;
}

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
    required: true,
  },
  expired: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  ticket: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
});

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (order: OrderInterface) => {
  return new Order(order);
};

OrderSchema.methods.toJSON = function () {
  const ticketObj = this.toObject();
  return ticketObj;
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
