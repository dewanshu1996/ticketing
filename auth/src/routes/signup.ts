import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../model/user";
import { BadError } from "@dewanshu1996/common";
import jwt from "jsonwebtoken";
import { requestValidator } from "@dewanshu1996/common";

const router = express.Router();

router.post(
  "/api/users/sign-up",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("password should be of min 6 chars"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new BadError("Email in use already");
    }

    const userNew = User.build({ email, password });
    await userNew.save();

    const jwtToken = jwt.sign(
      {
        id: userNew.id,
        email: userNew.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwtToken,
    };

    return res.status(201).send(userNew);
  }
);

export { router as signUpRoute };
