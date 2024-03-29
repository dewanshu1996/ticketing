import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Key fetch failed");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
};

start();
