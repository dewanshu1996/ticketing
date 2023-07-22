import { CustomError } from "./custom-error";

export class BadError extends CustomError {
  public statusCode: number = 400;
  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, BadError.prototype);
  }

  serializeErrors() {
    return [
      {
        msg: this.message,
      },
    ];
  }
}
