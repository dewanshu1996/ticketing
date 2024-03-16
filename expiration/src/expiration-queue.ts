import Queue from "bull";
import { OrderExpiredPublisher } from "./events/publisher/order-expired-publisher";
import { natsWrapper } from "./nats-init";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expired", {
  redis: {
    host: "expiration-redis-srv",
  },
});

expirationQueue.process(async (job) => {
  new OrderExpiredPublisher(natsWrapper._client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
