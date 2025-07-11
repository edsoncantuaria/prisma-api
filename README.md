# Projeto Prisma-API-Test

API RESTful construída com Node.js, Express e Prisma, utilizando banco MySQL/MariaDB. Projeto focado em aprendizado de backend, deploy em servidor próprio, testes automatizados e automação do banco.

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- MySQL / MariaDB
- Jest e Supertest (testes automatizados)
- PM2 (process manager para deploy)
- Cron (agendamento de reset do banco)
- Cloudflared (exposição segura da API)

---

## Estrutura do Projeto

- `index.js`: arquivo principal da API, com rotas CRUD para usuários.
- `client.js`: cliente Prisma configurado para conexão com o banco.
- `resetDB.js`: script para resetar a tabela de usuários, limpando dados e resetando IDs.
- `package.json`: gerenciador de dependências e scripts.
- `prisma/schema.prisma`: modelo do banco e configuração do Prisma.
- `.env`: variáveis de ambiente, incluindo porta e segredo da API.

---

## Funcionalidades

- CRUD completo para recurso `usuario` (nome, email, idade).
- Autenticação básica via token Bearer para proteção das rotas.
- Testes automatizados com Jest e Supertest cobrindo os endpoints.
- Simulação de múltiplas requisições para teste de concorrência e performance.
- Logs e monitoramento (a implementar).
- Deploy no servidor local com PM2.
- Exposição segura via Cloudflared.
- Script `resetDB.js` para limpeza diária do banco via cron job.

---

## Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar `.env`

```env
PORT=6061
DATABASE_URL="mysql://usuario:senha@localhost:3306/test_db"
API_SECRET="segredo123"
```

### 3. Criar e migrar o banco

```bash
npx prisma migrate dev --name init
```

### 4. Gerar cliente Prisma

```bash
npx prisma generate
```

### 5. Rodar a API localmente

```bash
node index.js
```

Ou com PM2:

```bash
pm2 start index.js --name prisma-api-test
```

### 6. Rodar script de reset do banco manualmente

```bash
node resetDB.js
```

### 7. Agendar reset diário via cron (exemplo às 3h da manhã)

Abra o crontab:

```bash
crontab -e
```

Adicione:

```
0 3 * * * /usr/bin/node /home/edson/prisma-api-test/resetDB.js >> /home/edson/resetDB.log 2>&1
```

---

## Testes

Usando Jest e Supertest para testar endpoints, autenticação e concorrência.

Executar:

```bash
npm test
```

---

## Possíveis melhorias futuras

- Implementar logs com Morgan para monitorar requisições.
- Middleware global de tratamento de erros.
- Documentação da API com Swagger ou Postman.
- Interface web com React para gerenciamento dos usuários.
- Segurança mais avançada (OAuth, rate limiting).
- Monitoramento e alertas.

---

## Aprendizados e desafios

- Como estruturar e proteger uma API simples.
- Uso do Prisma com MySQL para manipulação do banco.
- Automação de tarefas repetitivas no backend com scripts e cron.
- Deploy e exposição segura da API em servidor próprio.
- Testes automatizados para garantir qualidade e estabilidade.

---

### Autor

Edson Cantuaria — Analista de Teste.
https://www.linkedin.com/in/edson-cantuaria/

---

**Projeto criado como parte da jornada de aprendizado para construir APIs de produção e automação backend.**
