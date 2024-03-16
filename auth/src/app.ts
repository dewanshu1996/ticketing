import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

require("express-async-errors");

import { currentUserRouter } from "./routes/current-user";
import { signUpRoute } from "./routes/signup";
import { signInRoute } from "./routes/signin";
import { signOutRoute } from "./routes/signout";
import { errorHandler, NotFoundError } from "@dewanshu1996/common";

const app = express();
app.use(json());

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signInRoute);
app.use(signUpRoute);
app.use(signOutRoute);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
