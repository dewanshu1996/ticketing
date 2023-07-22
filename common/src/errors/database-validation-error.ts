import { CustomError } from "./custom-error";

export class DbValidationError extends CustomError {
  public statusCode: number = 500;
  public message: string = "Db exception";
  constructor() {
    super();

    Object.setPrototypeOf(this, DbValidationError.prototype);
  }

  serializeErrors() {
    return [
      {
        msg: this.message,
      },
    ];
  }
}
