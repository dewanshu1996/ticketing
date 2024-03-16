import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@dewanshu1996/common";
import { NotFoundError } from "@dewanshu1996/common";

require("express-async-errors");

import { newTicket } from "./routes/new-ticket";
import { updateTicket } from "./routes/update-ticket";
import { showTickets } from "./routes/show-tickets";
import { showTicket } from "./routes/show-ticket";

const app = express();
app.use(json());

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(newTicket);
app.use(updateTicket);
app.use(showTickets);
app.use(showTicket);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
