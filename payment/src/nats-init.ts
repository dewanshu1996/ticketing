import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  public _client!: Stan;

  connect(clusterid: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterid, clientId, { url });
    return new Promise((resolve, reject) => {
      this._client.on("connect", () => {
        resolve();
      });

      this._client.on("error", () => {
        reject();
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
