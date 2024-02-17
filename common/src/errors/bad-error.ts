import { CustomError } from "./custom-error";

export class BadError extends CustomError {
  public statusCode: number = 400;
  constructor(public message: string) {
    super();
    console.log("bad error called");
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
