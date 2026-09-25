# NX E-Commerce

E-commerce application developed as a system design and software engineering exercise.

The project is being developed incrementally, focusing on clean architecture, scalability, resilience, observability, security, and cloud infrastructure.

## Architecture

The current project foundation is based on:

* **Backend:** Express + TypeScript
* **Frontend:** React + TypeScript
* **Database:** PostgreSQL
* **Infrastructure:** Terraform
* **Containers:** Docker / Docker Compose
* **API:** REST

Future phases will introduce additional components such as authentication, product management, orders, inventory, payments, asynchronous communication, resilience, observability, and cloud infrastructure.

## Requirements

The following tools are required for local development:

* Node.js 22.13.0
* npm 10+
* Docker
* Docker Compose
* Terraform

The Node.js version is defined in `.nvmrc`.

## Project Structure

```text
nx-ecommerce/
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── database/
│
├── infra/
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── .terraform.lock.hcl
│
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── .nvmrc
└── README.md
```

## Node.js

The project uses Node.js 22.13.0.

If using NVM:

```bash
nvm use
```

Verify the version:

```bash
node --version
```

Expected:

```text
v22.13.0
```

## Environment Configuration

Local environment variables are stored in `.env`.

Create the local environment file from the example:

```bash
cp .env.example .env
```

The `.env` file is ignored by Git and must not be committed.

Example configuration:

```env
POSTGRES_DB=nx_ecommerce
POSTGRES_USER=nx_ecommerce
POSTGRES_PASSWORD=nx_ecommerce
```

## PostgreSQL

PostgreSQL runs locally using Docker Compose.

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Check the containers:

```bash
docker compose ps
```

Check PostgreSQL connectivity:

```bash
docker compose exec postgres pg_isready -U nx_ecommerce -d nx_ecommerce
```

Expected result:

```text
/var/run/postgresql:5432 - accepting connections
```

PostgreSQL is exposed locally on:

```text
localhost:5432
```

## Backend

The backend is implemented using Express and TypeScript.

### Install dependencies

```bash
cd backend
npm install
```

### Development

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

### Health Check

The backend exposes a basic health endpoint:

```text
GET /health
```

Example:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

### Production Build

```bash
npm run build
```

### Production Start

```bash
npm start
```

## Frontend

The frontend is implemented using React and TypeScript with Vite.

### Install dependencies

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

## Docker

The project includes Docker configuration for local development.

### Build and start all services

From the project root:

```bash
docker compose up --build
```

### Start services in the background

```bash
docker compose up -d
```

### Check running containers

```bash
docker compose ps
```

### Stop services

```bash
docker compose down
```

### Stop services and remove volumes

```bash
docker compose down -v
```

> The `-v` option removes Docker volumes, including the local PostgreSQL data.

## Terraform

Terraform configuration is located under:

```text
infra/terraform/
```

Terraform is currently used to establish the infrastructure configuration foundation. Cloud resources will be added in later phases.

### Initialize Terraform

```bash
cd infra/terraform
terraform init
```

### Validate configuration

```bash
terraform validate
```

Expected result:

```text
Success! The configuration is valid.
```

### Preview infrastructure changes

```bash
terraform plan
```

At the current stage, Terraform does not define infrastructure resources, so the expected result is:

```text
No changes. Your infrastructure matches the configuration.
```

## Git Workflow

The project uses feature branches following the `NX_X` naming convention.

Examples:

```text
NX_0
NX_1
NX_2
NX_3
NX_4
NX_5
NX_6
NX_7
```

Each phase is developed in its own branch and merged into `main` through a Pull Request.

Typical workflow:

```bash
git checkout main
git pull origin main

git checkout -b NX_X
```

After completing the work:

```bash
git add .
git commit -m "NX_X: Description"
git push -u origin NX_X
```

Then create a Pull Request:

```text
NX_X → main
```

After merging:

```bash
git checkout main
git pull origin main
```

## Development Principles

The project is being developed incrementally with the following principles:

* Keep services independently maintainable.
* Prefer simple solutions before introducing additional infrastructure.
* Use asynchronous communication where it provides clear benefits.
* Design for resilience and failure handling.
* Keep database consistency explicit.
* Use idempotency for operations that may be retried.
* Keep secrets and environment-specific configuration outside the source code.
* Automate infrastructure using Terraform.
* Use Docker for reproducible local development.
* Introduce additional infrastructure only when required by the architecture.

## Current Status

### Phase 1 — Project Foundation

* [x] Monorepo
* [x] Backend with Express + TypeScript
* [x] Frontend with React + TypeScript
* [x] Docker development environment
* [x] PostgreSQL
* [x] Environment configuration
* [x] Terraform foundation
* [x] Development documentation

### Phase 2 — Application Foundation

Planned components include:

* Authentication and JWT
* Product management
* Product API
* Database integration
* Application data models
* Initial REST API structure
* Backend architecture and organization

Additional components such as Orders, Inventory, Payments, asynchronous processing, Outbox, resilience, observability, and cloud infrastructure will be introduced progressively in subsequent phases.
