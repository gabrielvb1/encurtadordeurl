import request from "supertest";
import app from "../../src/index.js";
import { db } from "../../src/connection/connection.js";


afterAll(async () => {
  await db.destroy();
});

describe("Testes de Signup e Login", () => {
  it("Deve retornar 200 e uma mensagem de sucesso", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        name: "jose da silva de oliveira",
        email: "josedasilvaoliveira2@email.com",
        password: "1234",
      });
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ok");
  });
  it("Deve retornar 200 e um token de autenticação", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "jose@email.com",
        password: "1234",
      });

    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("loggedUser");
  });
});
