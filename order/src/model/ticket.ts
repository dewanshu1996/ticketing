import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@dewanshu1996/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketInterface {
  id: string;
  price: number;
  title: string;
  orderId?: string;
}

export interface TicketDoc extends mongoose.Document {
  id: string;
  price: number;
  title: string;
  orderId?: string;
  version: number;
}

interface TicketrModel extends mongoose.Model<any> {
  build(ticket: TicketInterface): TicketDoc;
  toJSON(): TicketDoc;
  isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  orderId: {
    type: String,
  },
});

ticketSchema.statics.build = (ticket: TicketInterface) => {
  return new Ticket(ticket);
};

ticketSchema.methods.toJSON = function () {
  const ticketObj = this.toObject();
  ticketObj.id = ticketObj._id;
  delete ticketObj.__v;
  delete ticketObj._id;
  return ticketObj;
};

ticketSchema.methods.isReserved = async function () {
  const order = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Complete,
        OrderStatus.AwaitingPayment,
      ],
    },
  });

  console.log(order);

  return order === null ? false : true;
};

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDoc, TicketrModel>("Ticket", ticketSchema);

export { Ticket };
