# FindPartner - Backend

Backend da aplicação **FindPartner**, desenvolvido como Trabalho de Conclusão de Curso (TCC).

## ✨ Sobre o Projeto

O **FindPartner** é uma plataforma desenvolvida para conectar **fornecedores** e **varejistas** que desejam formar parcerias comerciais. Esta parte do projeto é responsável por gerenciar a lógica de negócios, autenticação, persistência de dados e integração entre os usuários da plataforma.

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express.js**
- **TypeORM** (ORM para banco de dados)
- **PostgreSQL** (Banco de dados relacional)
- **ESLint** e **Prettier** (Padronização de código)

## 🚀 Como Rodar o Projeto

Clone o repositório:

```bash
git clone https://github.com/FelipenKniess/backend-findpartner.git
```

Instale as dependências:

```bash
yarn install
# ou
npm install
```

Configure as variáveis de ambiente (exemplo de `.env`):

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=findpartner
JWT_SECRET=sua_chave_secreta
```

Rode as migrações do banco de dados (se necessário).

Inicie o servidor:

```bash
yarn dev
# ou
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## 📚 Scripts Disponíveis

- `yarn dev` – Inicia o servidor em modo de desenvolvimento.
- `yarn build` – Gera o build de produção.
- `yarn start` – Inicia o servidor em produção.
- `yarn lint` – Analisa o código com ESLint.

## 📄 Licença

Este projeto está sob a licença MIT.
