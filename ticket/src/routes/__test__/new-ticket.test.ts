import request from "supertest";
import { app } from "../../app";

it("check if api is accassable", async () => {
  const response = await request(app).post(`/api/ticket/new-ticket`).send();
  expect(response.status).not.toEqual(404);
});

it("create a new ticket", async () => {
  const response = await request(app)
    .post("/api/ticket/new-ticket")
    .set("Cookie", global.signin())
    .send({
      title: "my first ticket",
      price: 100,
    });
});
