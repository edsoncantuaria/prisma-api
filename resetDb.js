const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Zera a tabela completamente (TRUNCATE RESTART IDENTITY)
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE Usuario;`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  // Reinsere os dados padrão
  await prisma.usuario.createMany({
    data: [
      {
        nome: "Edson Cantuaria",
        email: "edsoncantuaria@outlook.com",
        idade: 25,
      },
      {
        nome: "Usuário de Teste",
        email: "teste@email.com",
        idade: 25,
      },
    ],
  });

  console.log("Banco de dados resetado com sucesso e IDs reiniciados.");
}

main()
  .catch((e) => {
    console.error("Erro ao resetar banco:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
