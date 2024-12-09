import request from "supertest";
import app from "../../src/index.js";
import { db } from "../../src/connection/connection.js";

let token;

beforeAll(async () => {
  const response = await request(app)
    .post("/login")
    .send({
      email: "jose@email.com",
      password: "1234",
    });
  token = response.body.token;
});

afterAll(async () => {
  await db.destroy();
});

describe("Testes de CRUD e Redirecionamento de URL", () => {
  it("Deve criar uma URL encurtada a partir de uma existente", async () => {
    const response = await request(app)
      .post("/shorturl")
      .set("Authorization", `Bearer ${token}`) //Token opcional para esta rota
      .send({
        bigUrl: "https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("originalUrl");
    expect(response.body).toHaveProperty("shortenedUrl");
  });

  it("Deve mostrar URLs encurtadas de um usuário autenticado", async () => {
    const response = await request(app)
      .get("/urls/users")
      .set("Authorization", `Bearer ${token}`)
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("urls");
  });

  it("Deve poder atualizar a origem de uma URL encurtada", async () => {
    const response = await request(app)
      .put("/urls/shorturl")
      .send({
        newBigUrl: "https://www.uol.com.br",
        shortenedUrl: "http://localhost:3033/83dee1",
      })
      .set("Authorization", `Bearer ${token}`)
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("updatedUrl");
  });

  it("Deve poder excluir uma URL encurtada passando o parâmetro de rota da URL encurtada", async () => {
    const shortenedUrlParamId = '297416' //Escolha uma URL que ainda não foi excluida
    const response = await request(app)
      .delete(`/urls/${shortenedUrlParamId}`)
      .set("Authorization", `Bearer ${token}`)
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ok");
  });

  it("Deve poder redirecionar o usuário para o URL de origem e contabilize", async () => {
    const response = await request(app)
      .post('/urls/redirect')
      .send({
        shortenedUrl: "http://localhost:3033/83dee1",
      })
      .set("Authorization", `Bearer ${token}`)
    console.log(response.headers.location)
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://www.uol.com.br")
  });
});
