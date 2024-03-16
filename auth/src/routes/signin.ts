import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requestValidator } from "@dewanshu1996/common";
import { BadError } from "@dewanshu1996/common";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import { Password } from "../services/Password";

const router = express.Router();

router.post(
  "/api/users/sign-in",
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
    if (!userExist) {
      throw new BadError("User does not exist");
    }

    const isPwdCorrect = await Password.compoarePwd(
      userExist.password,
      password
    );

    if (!isPwdCorrect) {
      throw new BadError("User does not exist");
    }

    const jwtToken = jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwtToken,
    };

    return res.send(userExist);
  }
);

export { router as signInRoute };
