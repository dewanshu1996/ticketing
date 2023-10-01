import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next();
  }

  cookie = cookie!.slice("session=".length);

  try {
    const payload = jwt.verify(cookie, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
