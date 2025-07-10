const express = require("express");
const cors = require("cors");
const prisma = require("./client");
const autenticar = require("./auth");
const validarUsuario = require("./validateUser");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", autenticar);

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar users" });
  }
});

app.post("/users", validarUsuario, async (req, res) => {
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

app.put("/users/:id", validarUsuario, async (req, res) => {
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

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}
