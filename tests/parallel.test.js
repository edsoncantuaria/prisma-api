const request = require("supertest");
const express = require("express");
const app = require("../index");

describe("Criar múltiplos usuários em paralelo", () => {
  it("deve criar 5 usuários simultaneamente", async () => {
    const start = Date.now();
    const users = [...Array(500)].map((_, i) => ({
      nome: `User${i}`,
      email: `user${i}@email.com`,
      idade: Math.floor(Math.random() * 60) + 1,
    }));

    const promises = users.map((user) =>
      request(app)
        .post("/users")
        .set("Authorization", `Bearer ${process.env.API_SECRET}`)
        .send(user)
    );

    const results = await Promise.all(promises);

    results.forEach((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
    });
    const end = Date.now();
    console.log(`Tempo total para criar 500 usuários: ${end - start}ms`);
  });
});
