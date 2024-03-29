import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("enter error handler");
  console.log(err);

  if (err instanceof CustomError) {
    //   res.status(err.statusCode).send({ errors: err.serializeErrors() });
    console.log("reached here");
    console.log(err);
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    console.log("complete error handler");
  }
  // }

  res.status(500).send({ errors: [{ msg: "Server exception" }] });
};
