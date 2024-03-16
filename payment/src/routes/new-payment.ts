import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizeError,
  NotFoundError,
  OrderStatus,
  requestValidator,
  BadError,
} from "@dewanshu1996/common";

import { currentUser, requireAuth } from "@dewanshu1996/common";
import { Order } from "../model/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/api/payment/new-ticket",
  requireAuth,
  currentUser,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  requestValidator,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;

    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== userId) {
      throw new NotAuthorizeError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadError("Order is cancelled");
    }

    await stripe.charges.create({
      currency: "usd",
      amount: order.amount * 100,
      source: token,
    });

    return res.send({ success: true });
  }
);

export { router as newPayment };
