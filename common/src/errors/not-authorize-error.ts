import { CustomError } from "./custom-error";

export class NotAuthorizeError extends CustomError {
  public statusCode: number = 401;
  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }

  serializeErrors() {
    return [
      {
        msg: "User is not logged in",
      },
    ];
  }
}
