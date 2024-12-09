# **API de Encurtamento e Redirecionamento de URLs**

Este projeto é uma API de encurtamento e redirecionamento de URLs construída com **Node.js**, **Express**, e **SQLite**. A API permite encurtar URLs, gerenciar URLs encurtadas, e redirecionar os usuários para as URLs originais. O projeto utiliza **Docker** e **Docker Compose** para simplificar a configuração e execução local.

---

## **Funcionalidades Principais**

As principais funcionalidades da API são:

- **Cadastro de Usuários**
- **Autenticação de Usuários**
- **Criação de URLs Encurtadas**
- **Listagem de URLs de um Usuário**
- **Atualização de URLs**
- **Exclusão de URLs**
- **Redirecionamento para URLs Originais**

---

## **Requisitos**

Certifique-se de que você possui os seguintes softwares instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js (caso deseje rodar localmente sem Docker)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## **Rotas da API**

### **Autenticação**
#### **Cadastro de Usuário**
- **Endpoint:** `POST /signup`
- **Descrição:** Cadastra um novo usuário no sistema.

#### **Login de Usuário**
- **Endpoint:** `POST /login`
- **Descrição:** Autentica um usuário e retorna um token de acesso.

### **Gerenciamento de URLs**
#### **Criar URL Encurtada**
- **Endpoint:** `POST /shorturl`
- **Descrição:** Cria uma URL encurtada associada ao usuário autenticado ou não.

#### **Listar URLs do Usuário**
- **Endpoint:** `GET /urls/users`
- **Descrição:** Retorna todas as URLs encurtadas criadas apenas pelo usuário autenticado.

#### **Atualizar URL Original**
- **Endpoint:** `PUT /urls/shorturl`
- **Descrição:** Atualiza a URL original de uma URL encurtada.

#### **Excluir URL**
- **Endpoint:** `DELETE /urls/:shortId`
- **Descrição:** Exclui uma URL encurtada do sistema passando o parâmetro de rota da URL encurtada (shortId) nos parametros da requisição.

#### **Redirecionar para URL Original**
- **Endpoint:** `POST /urls/redirect`
- **Descrição:** Redireciona o usuário para a URL original associada à URL encurtada.


## **Execução Local**

### **Com Docker**
1. Certifique-se de que você tem o Docker e Docker Compose instalados.
2. No terminal, execute:
   ```bash
   docker-compose up
3. A API estará disponível em http://localhost:3033.
## **Configuração de Variáveis de Ambiente**

Antes de executar a aplicação, você deve criar um arquivo `.env` na raiz do projeto. Esse arquivo deve conter as variáveis de ambiente necessárias para o funcionamento da aplicação. Abaixo está a descrição das variáveis usadas neste projeto:

### **Variáveis Disponíveis**

- `DB_FILENAME`: Caminho para o arquivo SQLite que será usado como banco de dados.
  - **Exemplo**: `./database.db`

- `PORT`: Porta na qual o servidor será executado.
  - **Exemplo**: `3033`

- `API_PASS`: Senha utilizada para autenticação da API.
  - **Exemplo**: `apisenha`

- `JWT_EXPIRES`: Tempo de expiração do token JWT.
  - **Exemplo**: `8h`

### **Exemplo de Arquivo `.env`**

Crie um arquivo `.env` e adicione o seguinte conteúdo (personalize conforme necessário):

```env```
DB_FILENAME=./database.db
PORT=3033
API_PASS=apisenha
JWT_EXPIRES=8h


### **Sem Docker**
1. Instale as dependências:
   ```bash
   npm install
2. Configure o banco de dados SQLite no arquivo de conexão.
3. Inicie a API:
    ```bash
   npm start
4. A API estará disponível em http://localhost:3033.

## **Documentação da API**

A API conta com uma documentação interativa gerada pelo Swagger, que permite visualizar e testar os endpoints diretamente no navegador.

Após iniciar a API, você pode acessar a documentação Swagger em:

[http://localhost:3033/api-docs/#/default](http://localhost:3033/api-docs/#/default)

## **Testes**

A API Conta com testes unitários de todos os endpoints. Para rodar os testes da API execute o comando:
  ```bash
   npm test

  
