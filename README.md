# Controle Financeiro | Frontend

Interface web desenvolvida em **Angular e TypeScript** para uma aplicação de controle financeiro pessoal, integrada a uma API REST construída com Java e Spring Boot.

O projeto tem como objetivo permitir o gerenciamento de receitas e despesas, oferecendo uma interface para consultar e organizar transações financeiras.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML5
- CSS3
- Angular HttpClient
- Angular Signals
- Git e GitHub

## Funcionalidades implementadas

- Listagem de transações financeiras.
- Integração com a API REST utilizando requisições HTTP.
- Paginação de transações com navegação entre páginas.
- Exibição de descrição, valor, tipo, categoria e data das transações.
- Atualização reativa da interface utilizando Angular Signals.

## Como executar o projeto

**Pré-requisitos:** Node.js, npm e Angular CLI.

Clone o repositório e acesse a pasta:

```bash
git clone https://github.com/SEU-USUARIO/controle-financeiro-frontend.git
cd controle-financeiro-frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
ng serve -o
```

A aplicação estará disponível em `http://localhost:4200`.

**Observação:** para carregar as transações, é necessário que a API backend esteja em execução em `http://localhost:8080`, com o banco de dados configurado.

## Backend

O frontend consome uma API REST desenvolvida com Java, Spring Boot, Spring Data JPA e PostgreSQL.

O backend é responsável pelas regras de negócio, persistência dos dados e paginação das transações.

## Status do projeto

🚧 Em desenvolvimento.

Funcionalidades de cadastro, edição e exclusão de transações, além da integração do resumo financeiro, estão previstas para etapas futuras.
