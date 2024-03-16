import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { NotFoundError, requestValidator } from "@dewanshu1996/common";
import { BadError } from "@dewanshu1996/common";
import { Ticket } from "../model/ticket";
import { requireAuth } from "@dewanshu1996/common";
import { TicketUpdatedPublisher } from "../event/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-init";
import { version } from "mongoose";

const router = express.Router();

router.post(
  "/api/ticket/update-ticket/:id",
  requireAuth,
  [
    param("id").isMongoId().withMessage("Not a valid ticket referece"),
    body("title").trim().isString().withMessage("Ticket name must be a string"),
    body("price")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) return false;
      })
      .withMessage("password should be of min 6 chars"),
    body("userId").trim().isMongoId().withMessage("Invalid user id"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const { id } = req.params;

    try {
      const ticket = await Ticket.findById(id);

      if (!ticket) {
        throw new NotFoundError();
      }

      ticket.set({ title, price });
      await ticket.save();

      new TicketUpdatedPublisher(natsWrapper._client).publish({
        id: ticket.id,
        price: ticket.price,
        version: ticket.version,
        title: ticket.title,
      });

      return res.send(ticket);
    } catch (error) {
      throw new BadError("ticket update failed");
    }
  }
);

export { router as updateTicket };
