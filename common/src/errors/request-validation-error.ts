import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  public statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error: ValidationError) => {
      return {
        msg: error.msg,
        field: error.type === "field" ? error.path : "",
      };
    });
  }
}
