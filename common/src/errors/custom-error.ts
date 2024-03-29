import { ErrorInterface } from "../interface/error-interface";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): ErrorInterface[];
}
