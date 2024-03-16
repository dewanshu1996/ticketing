import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@dewanshu1996/common";
import { NotFoundError } from "@dewanshu1996/common";

require("express-async-errors");

import { CreateOrder } from "./routes/create";
import { ShowOrder } from "./routes/index";
import { ShowOrders } from "./routes/show";
import { DeleteOrder } from "./routes/delete";

const app = express();
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(ShowOrder);
app.use(CreateOrder);
app.use(ShowOrders);
app.use(DeleteOrder);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
