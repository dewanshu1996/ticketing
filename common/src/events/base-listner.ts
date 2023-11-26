import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listner<T extends Event> {
  protected client: Stan;
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  protected ackWait = 5000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(
        `Received event #${msg.getSequence()}, ${this.subject} / ${
          this.queueGroupName
        }`
      );

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
      msg.ack();
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
