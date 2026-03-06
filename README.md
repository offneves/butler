# 🎩 Butler

O **Butler** é uma plataforma moderna para gerenciamento, criação e orquestração de Agentes de Inteligência Artificial personalizados.

A ideia central do projeto é permitir a criação de **agentes especialistas** no software ou domínio de negócios do cliente, capacitando-os a utilizar o sistema da maneira que preferirem. Pela plataforma do Butler, você consegue configurar cada agente de forma minuciosa, fornecendo:
- Arquivos de PRD (Product Requirements Document).
- Arquivos de Contexto da aplicação.
- Tools (Ferramentas/Ações) específicas.
- Conexões com banco de dados e APIs externas.

---

## 🏗️ Estrutura do Projeto (Monorepo)

Este repositório está organizado no formato Monorepo e contém os dois principais serviços da aplicação:

- **`/butler-backend`**: A API principal do Butler, construída utilizando Java (Spring Boot) com sistema de build Maven. Responsável por lidar com a persistência de dados (Planos, Usuários, Credenciais LLM), segurança e futuramente a parte lógica da orquestração dos agentes.
- **`/butler-frontend`**: A interface de usuário, construída com Vite. Contém a plataforma web onde o cliente irá gerenciar e configurar seus agentes de IA.

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Backend:** Java 17+ (ou versão correspondente do projeto) e Maven (ou use o respectivo `mvnw` incluso). Uma instância de Banco de Dados também pode ser necessária dependendo da configuração no `application.properties`.
- **Frontend:** Node.js (v18+) e NPM/PNPM/Yarn.

### Executando o Backend
1. Navegue até a pasta do backend: `cd butler-backend`
2. Instale as dependências e rode através do Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

### Executando o Frontend
1. Navegue até a pasta do frontend: `cd butler-frontend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

*Repositório inicializado para desenvolvimento e construção da arquitetura inicial do Butler.*
