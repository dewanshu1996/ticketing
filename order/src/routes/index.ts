import express, { Request, Response } from "express";
import { Order } from "../model/order";
import { NotFoundError, currentUser, requireAuth } from "@dewanshu1996/common";

const router = express.Router();

router.get(
  "/api/order/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findOne({
      userId: req.currentUser!.id,
      _id: orderId,
    }).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    return res.send(order);
  }
);

export { router as ShowOrder };
