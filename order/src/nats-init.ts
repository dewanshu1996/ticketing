import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  public _client!: Stan;

  connect(clusterid: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterid, clientId, {
      url,
    });

    return new Promise((resolve, reject) => {
      this._client.on("connect", (msg) => {
        resolve();
      });

      this._client.on("error", (err) => {
        console.log("failed to cennect to nats");
        reject();
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
