const request = require("supertest");
const express = require("express");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.usuario.deleteMany(); // apaga todos os usuários
  await prisma.$disconnect(); // desconecta do bd
});

let userIdCriado = null;

describe("GET /users", () => {
  it("deve retornar status 200 e um array de usuários", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${process.env.API_SECRET}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve retornar status 403 em caso de Token inválido", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer invalid_token`);
    expect(res.statusCode).toEqual(403);
    expect(res.body.error).toBe("Token inválido");
  });

  it("deve retornar status 401 se o token não for fornecido", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toBe("Token não fornecido");
  });
});

describe("POST /users", () => {
  it("deve retornar status 201 e criar um novo usuário", async () => {
    const newUser = {
      nome: "Joao Teste",
      email: "joao.teste@email.com",
      idade: 25,
    };

    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_SECRET}`)
      .send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toEqual(newUser.nome);
    expect(res.body.email).toEqual(newUser.email);
    expect(res.body.idade).toEqual(newUser.idade);

    userIdCriado = res.body.id; // salva ID para PUT/DELETE
  });

  it("deve retornar 400 se os dados forem inválidos", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_SECRET}`)
      .send({ nome: "", email: "emailinvalido", idade: "texto" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erros");
    expect(Array.isArray(res.body.erros)).toBe(true);
  });
});

describe("PUT /users/:id", () => {
  it("deve atualizar os dados do usuário", async () => {
    const res = await request(app)
      .put(`/users/${userIdCriado}`)
      .set("Authorization", `Bearer ${process.env.API_SECRET}`)
      .send({ nome: "Joao Atualizado", email: "joao@novo.com", idade: 30 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toEqual("Joao Atualizado");
  });
});

describe("DELETE /users/:id", () => {
  it("deve remover o usuário criado nos testes", async () => {
    const res = await request(app)
      .delete(`/users/${userIdCriado}`)
      .set("Authorization", `Bearer ${process.env.API_SECRET}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Usuário deletado");
  });
});

describe("POST /users - validação de dados", () => {
  it("deve retornar erro para nome vazio", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_SECRET}`)
      .send({ nome: "", email: "joao@email.com", idade: 25 });

    expect(res.statusCode).toBe(400);
    expect(res.body.erros).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "nome" })])
    );
  });

  it("deve retornar erro para email inválido", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_SECRET}`)
      .send({ nome: "Joao", email: "email-errado", idade: 25 });

    expect(res.statusCode).toBe(400);
    expect(res.body.erros).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "email" })])
    );
  });
});
