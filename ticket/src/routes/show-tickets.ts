import express, { Request, Response } from "express";
import { BadError } from "@dewanshu1996/common";
import { Ticket } from "../model/ticket";
import { requireAuth } from "@dewanshu1996/common";

const router = express.Router();

router.get(
  "/api/ticket/show-tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.find();

      return res.send(tickets);
    } catch (error) {
      throw new BadError("No tickets found");
    }
  }
);

export { router as showTickets };
