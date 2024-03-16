import mongoose from "mongoose";
import { OrderStatus } from "@dewanshu1996/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderInterface {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
  version: string;
  userId: string;
  price: number;
  status: OrderStatus;
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
  price: {
    type: Number,
    require: true,
  },
});

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (order: OrderInterface) => {
  return new Order(order);
};

OrderSchema.methods.toJSON = function () {
  const orderObj = this.toObject();
  delete orderObj._id;
  return orderObj;
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
