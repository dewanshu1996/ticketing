import express, { Request, Response } from "express";
import { BadError } from "@dewanshu1996/common";
import { Ticket } from "../model/ticket";
import { requireAuth } from "@dewanshu1996/common";

const router = express.Router();

router.get(
  "/api/ticket/show-ticket/:ticketId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    if (!ticketId) {
      throw new BadError("Invalid / No ticket id");
    }

    try {
      const ticket = await Ticket.findById(ticketId);

      return res.send(ticket);
    } catch (error) {
      throw new BadError("No tickets found");
    }
  }
);

export { router as showTicket };
