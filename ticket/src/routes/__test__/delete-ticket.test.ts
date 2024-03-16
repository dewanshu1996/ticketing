import request from "supertest";
import { app } from "../../app";

it("check if api is accassable", async () => {
  const response = await request(app)
    .post(`/api/ticket/delete-ticket/1234`)
    .send();
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

  const res = await request(app)
    .post(`/api/ticket/delete-ticket/${response.body._id}`)
    .set("Cookie", global.signin())
    .send();

  expect(res.status).toEqual(204);
});
