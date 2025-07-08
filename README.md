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
{
"nome": "Nome do Usuário",
"email": "email@example.com",
"idade": 30
}

🧪 Testando a API com Postman
Com a API em execução, você pode usar o Postman (ou qualquer outro cliente REST) para testar os endpoints:

Crie uma nova Collection no Postman.

Adicione requisições para cada um dos endpoints mencionados na seção "Funcionalidades da API".

Configure os métodos (GET, POST, PUT, DELETE) e as URLs.

Para requisições POST e PUT, configure o Body como raw e JSON.

Envie as requisições e observe as respostas.
