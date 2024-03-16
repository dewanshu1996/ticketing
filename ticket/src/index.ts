import mongoose from "mongoose";
import { natsWrapper } from "./nats-init";
import { app } from "./app";
import { OrderCreatedListner } from "./event/listners/order-created-listner";
import { OrderCancelledListner } from "./event/listners/order-cancelled-listner";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper._client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper._client.close());
    process.on("SIGTERM", () => natsWrapper._client.close());

    new OrderCreatedListner(natsWrapper._client).listen();
    new OrderCancelledListner(natsWrapper._client).listen();
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
};

start();
