import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@dewanshu1996/common";
import { NotFoundError } from "@dewanshu1996/common";
import { newPayment } from "./routes/new-payment";

require("express-async-errors");

const app = express();
app.use(json());

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(errorHandler);

app.use(newPayment);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(currentUser);

export { app };
