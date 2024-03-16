import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requestValidator } from "@dewanshu1996/common";
import { BadError, NotAuthorizeError } from "@dewanshu1996/common";
import { Ticket } from "../model/ticket";
import { currentUser, requireAuth } from "@dewanshu1996/common";
import { TicketCreatedPublisher } from "../event/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-init";

const router = express.Router();

router.post(
  "/api/ticket/new-ticket",
  requireAuth,
  [
    body("title").trim().isString().withMessage("Ticket name must be a string"),
    body("price")
      .trim()
      .isNumeric()
      .withMessage("price can not be less then 0"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;

    const ticketNew = Ticket.build({ title, price, userId });
    await ticketNew.save();

    new TicketCreatedPublisher(natsWrapper._client).publish({
      id: ticketNew._id,
      price: ticketNew.price,
      version: ticketNew.version,
      title: ticketNew.title,
      userId: ticketNew.userId,
    });

    return res.send(ticketNew);
  }
);

export { router as newTicket };
