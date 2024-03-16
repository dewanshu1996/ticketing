import mongoose from "mongoose";
import { natsWrapper } from "./nats-init";

import { app } from "./app";
import { TicketCreatedListner } from "./events/listeners/ticket-created-listner";
import { TicketDeletedListner } from "./events/listeners/ticket-deleted-listner";
import { TicketUpdatedListner } from "./events/listeners/ticket-updated-listner";

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

  await mongoose.connect(process.env.MONGO_URI);

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper._client.on("close", (error) => {
    console.log(error);
    console.log("NATS connection closed!");
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper._client.close());
  process.on("SIGTERM", () => natsWrapper._client.close());

  new TicketCreatedListner(natsWrapper._client).listen();
  // new TicketDeletedListner(natsWrapper._client).listen();
  new TicketUpdatedListner(natsWrapper._client).listen();

  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
};

start();
