import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketInterface {
  price: number;
  title: string;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  price: number;
  title: string;
  userId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  orderId: string;
}

interface TicketrModel extends mongoose.Model<any> {
  build(ticket: TicketInterface): TicketDoc;
  toJSON(): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
  },
});

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (ticket: TicketInterface) => {
  return new Ticket(ticket);
};

ticketSchema.methods.toJSON = function () {
  const ticketObj = this.toObject();
  return ticketObj;
};

const Ticket = mongoose.model<TicketDoc, TicketrModel>("Ticket", ticketSchema);

export { Ticket };
