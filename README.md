<div align="center">
  <a href="https://github.com/rhenanstoccozimmermann/xpinc-investments-api">
    <img src=".github/xpinc.png" alt="Desafio Técnico Turma XP - Trybe" width="400px">
  </a>
  <h3 align="center">Desafio Técnico Turma XP - Trybe | XP Inc.</h3>
  <p align="center">
    Trata-se de desafio técnico proposto pela XP Inc. no processo seletivo da Turma XP - Trybe, no qual foi desenvolvido um aplicativo de investimento em ações, com algumas funcionalidades de conta digital.
  </p>
</div>


## Sumário

<ol>
  <li>
    <a href="#1-sobre-o-desafio">Sobre o desafio</a>
  </li>
  <li>
    <a href="#2-explicação-sobre-as-tomadas-de-decisão-no-projeto">Explicação sobre as tomadas de decisão no projeto</a>
  </li>
  <li>
    <a href="#3-instruções-sobre-como-executar-o-projeto">Instruções sobre como executar o projeto</a>
  </li>
  <li>
    <a href="#4-contato">Contato</a>
  </li>
</ol>


## 1. Sobre o desafio

Foi realizado o desafio de Back-End.

O desafio é composto dos seguintes requisitos:

### I) Requisitos mínimos gerais

#### a) Fazer um README.md que contenha:

- Uma explicação sobre as tomadas de decisão na abordagem do desafio;
- Instruções sobre como executar o projeto; e
- Outras informações importantes.

### II) Requisitos mínimos específicos

#### a) Desenvolver os endpoints listados abaixo:

- POST /investimentos/comprar
- POST /investimentos/vender
- GET /ativos/{cod-cliente}
- GET /ativos/{cod-ativo}
- POST /conta/deposito
- POST /conta/saque
- GET /conta/{cod-cliente}

Obs: os caminhos e nomes podem ser alterados pela pessoa candidata.

#### b) Criar uma lista de ações que passem as informações para o Front-End

- A API deverá retornar uma lista com todas as ações disponíveis.

### III) Requisitos adicionais

#### a) Testes unitários

- Não foi estabelecido um percentual de cobertura. Para fixar um parâmetro, a aplicação terá ao menos `80%` de cobertura de testes unitários.

#### b) Deploy da API

#### c) Autenticação e autorização JWT

#### d) Documentação da API (Swagger)

### IV) Contratos dos serviços

#### a) Requisições para investimento

#### POST /investimentos/comprar

- O endpoint recebe como entradas o código da conta compradora, o código do ativo e a quantidade de ativos comprados.

Validações a serem feitas:

- A quantidade de ativos a serem comprados não pode ser maior do que a quantidade de ativos disponíveis na corretora.

#### POST /investimentos/vender

- O endpoint recebe como entradas o código da conta vendedora, o código do ativo e a quantidade de ativos vendidos.

Validações a serem feitas:

- A quantidade de ativos a serem vendidos não pode ser maior do que a quantidade de ativos disponíveis na carteira.

#### GET BY CLIENT /ativos/{cod-cliente}

- O endpoint retorna o código do cliente, o código do ativo, a quantidade de ativos e o valor do ativo (para cada ativo encontrado).

#### GET BY ASSETS /ativos/{cod-ativo}

- O endpoint retorna o código do ativo, a quantidade de ativos e o valor do ativo.

#### b) Requisições para depósitos e saques

#### POST /conta/deposito

- O endpoint recebe como entradas o código do cliente e o valor do depósito.

Validações a serem feitas:

- A quantidade a ser depositada não poderá ser negativa ou igual a zero.

#### POST /conta/saque

- O endpoint recebe como entradas o código do cliente e o valor do saque.

Validações a serem feitas:

- A quantidade a ser sacada não poderá ser maior do que o saldo da conta; e
- A quantidade a ser sacada não poderá ser negativa ou igual a zero.

#### GET /conta/{cod-cliente}

- O endpoint retorna o código do cliente e o saldo da conta.


## 2. Explicação sobre as tomadas de decisão no projeto

Seguem as decisões tomadas no planejamento, implementação e conclusão do projeto, com a correspondente explicação.

### I) Padrões de arquitetura

Serão adotados os seguintes padrões de arquitetura:

- MSC (arquitetura de software com Model, Service e Controller)
- REST (arquitetura web com Representational State Transfer)

### II) Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL

### III) Diagrama de Entidade-Relacionamento (DER)

Para orientar a construção das tabelas através do Sequelize, foi elaborado o DER a seguir:

<div align="center">
  <img src=".github/database.png" alt="Diagrama de Entidade-Relacionamento" width="600px" />
</div>
<br />

Note que, tendo em vista que as tabelas "ativos" e "contas" possuem um relacionamento N:N (muitos para muitos), foi criada uma tabela intermediária ("contas_ativos").

Para a normalização do banco de dados, foi observada a 3ª Norma Formal (3FN).


## 3. Instruções sobre como executar o projeto

Para obter uma cópia local da aplicação e executá-la, siga os passos abaixo.

### I) Clonando o repositório

```bash
git clone git@github.com:rhenanstoccozimmermann/xpinc-investments-api.git
```

### II) Instalações

- Instalação do [Node.js](https://nodejs.org/en/); e
- Instalação das dependências com npm install (ou npm i).

### III) Execução da aplicação

### IV) Testes unitários

### V) Cobertura de código

### VI) Deploy da API


## 4. Contato

Rhenan Stocco Zimmermann

<div>
  <a href="https://www.linkedin.com/in/rhenanstoccozimmermann/">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</div>
<br />

<a href="#sumário">🔝 Voltar ao topo</a>
