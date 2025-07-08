README.md: API RESTful de Usuários com Node.js, Express e Prisma
Este projeto demonstra a criação de uma API RESTful completa para gerenciamento de usuários, utilizando Node.js, o framework web Express e o ORM Prisma para interação com o banco de dados.

O objetivo principal é fornecer um exemplo funcional de operações CRUD (Create, Read, Update, Delete) em um ambiente backend, sendo ideal para estudos e testes de API com ferramentas como o Postman.

🚀 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript assíncrono e baseado em eventos.

Express: Framework web minimalista e flexível para Node.js, usado para construir a API.

Prisma: ORM (Object-Relational Mapper) de nova geração que facilita a interação com bancos de dados, oferecendo tipagem segura e um fluxo de trabalho intuitivo.

CORS (Cross-Origin Resource Sharing): Middleware para Express que permite requisições de diferentes origens.

✨ Funcionalidades da API
A API expõe os seguintes endpoints para gerenciamento de usuários:

GET /users: Lista todos os usuários cadastrados.

GET /users/:id: Busca um usuário específico pelo ID.

POST /users: Cria um novo usuário.

Corpo da Requisição (JSON):

JSON

{
  "nome": "Nome do Usuário",
  "email": "email@example.com",
  "idade": 30
}
PUT /users/:id: Atualiza as informações de um usuário existente pelo ID.

Corpo da Requisição (JSON):

JSON

{
  "nome": "Novo Nome",
  "email": "novo.email@example.com",
  "idade": 31
}
DELETE /users/:id: Deleta um usuário específico pelo ID.

⚙️ Como Rodar o Projeto
Siga os passos abaixo para configurar e executar a API localmente:

Pré-requisitos:

Node.js (versão 14 ou superior recomendada)

npm ou yarn

Um banco de dados configurado para o Prisma (ex: SQLite, PostgreSQL, MySQL). Este exemplo usa um banco de dados simples que o Prisma pode criar (normalmente SQLite).

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO] # Substitua pela URL do seu repositório
cd [Nome_da_pasta_do_projeto]
Instale as dependências:

Bash

npm install
# ou
yarn install
Configure o Prisma:

Crie um arquivo .env na raiz do projeto e configure a conexão com seu banco de dados. Exemplo para SQLite:

DATABASE_URL="file:./dev.db"
Gere o cliente Prisma e execute as migrações para criar o esquema do banco de dados:

Bash

npx prisma generate
npx prisma migrate dev --name init
Inicie o servidor:

Bash

npm start
# ou
node index.js
O servidor estará rodando em http://localhost:3030.

🧪 Testando a API com Postman
Com a API em execução, você pode usar o Postman (ou qualquer outro cliente REST) para testar os endpoints:

Crie uma nova Collection no Postman.

Adicione requisições para cada um dos endpoints mencionados na seção "Funcionalidades da API".

Configure os métodos (GET, POST, PUT, DELETE) e as URLs.

Para requisições POST e PUT, configure o Body como raw e JSON.

Envie as requisições e observe as respostas.
