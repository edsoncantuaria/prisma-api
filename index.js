const express = require("express");
const cors = require("cors");
const prisma = require("./client");

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Rota para listar todos os users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar users" });
  }
});

// Rota para criar um Usuário
app.post("/users", async (req, res) => {
  try {
    const { nome, email, idade } = req.body;
    const usuario = await prisma.usuario.create({
      data: { nome, email, idade },
    });
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota para buscar um Usuário pelo ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar Usuário" });
  }
});

// Rota para atualizar um Usuário pelo ID
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, idade } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { nome, email, idade },
    });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar Usuário" });
  }
});

// Rota para deletar um Usuário pelo ID
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Usuário deletado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar Usuário" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
