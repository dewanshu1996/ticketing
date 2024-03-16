import express, { Request, Response } from "express";
import {
  requireAuth,
  requestValidator,
  NotFoundError,
  OrderStatus,
  BadError,
  currentUser,
} from "@dewanshu1996/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../model/ticket";
import { Order } from "../model/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-init";

const router = express.Router();

router.post(
  "/api/order/create",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.isValidObjectId(input))
      .withMessage("ticket Id is not provided"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isTicketReserved = await ticket.isReserved();

    if (isTicketReserved) {
      throw new BadError("Ticket is already reserved");
    }

    console.log("entered in after throw");

    const expireTime = new Date();
    expireTime.setSeconds(expireTime.getSeconds() + 60 * 5);

    const order = Order.build({
      userId: req.currentUser!.id,
      expired: expireTime,
      status: OrderStatus.Created,
      ticket,
    });

    await order.save();

    new OrderCreatedPublisher(natsWrapper._client).publish({
      id: order._id,
      status: order.status,
      userId: order.userId,
      expired: order.expired.toISOString(),
      version: ticket.version,
      ticket: {
        id: ticket._id,
        price: ticket.price,
      },
    });

    return res.status(201).send(order);
  }
);

export { router as CreateOrder };
