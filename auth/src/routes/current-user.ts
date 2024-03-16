import express from "express";
import { currentUser } from "@dewanshu1996/common";

const router = express.Router();

router.get("/api/users/current-user", currentUser, (req, res) => {
  console.log("current user");
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
