import express, { Request, Response } from "express";
import { Order } from "../model/order";
import {
  NotAuthorizeError,
  NotFoundError,
  OrderStatus,
  currentUser,
  requireAuth,
} from "@dewanshu1996/common";
import { natsWrapper } from "../nats-init";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete(
  "/api/order/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findOne({
      id: orderId,
    }).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper._client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    return res.status(204).send(order);
  }
);

export { router as DeleteOrder };
