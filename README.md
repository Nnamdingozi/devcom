# DevCom API

A backend project built with **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL** (via Docker), **Passport.js authentication (JWT)**, and validation using **Yup**.

---

## 🛠️ Tech Stack

- Node.js + Express.js
- TypeScript
- PostgreSQL (via Docker)
- Prisma ORM
- Passport.js (JWT authentication)
- Docker + Docker Compose
- Yup (Validation)

---

## 🚀 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Windows/macOS) or [Docker Engine](https://docs.docker.com/engine/install/) (Linux)
- Node.js (v16 or higher)
- npm (or pnpm/yarn)
- Prisma CLI (optional globally):  
  ```bash
  npm install -g prisma
  ```

---

## ⚙️ Docker Setup Instructions

1. **Install Docker**
   - Download Docker Desktop: [here](https://www.docker.com/products/docker-desktop)
   - After installation, verify Docker is installed:
     ```bash
     docker --version
     ```

2. **Start Docker**
   - Windows/macOS: Launch Docker Desktop
   - Linux:
     ```bash
     sudo systemctl start docker
     ```

3. **Run PostgreSQL Database via Docker Compose**
   In the project root directory, run:
   ```bash
   docker-compose up -d
   ```

4. **Stop Docker Containers**
   ```bash
   docker-compose down
   ```

---

## 🧑‍💻 Clone and Install

```bash
git clone https://github.com/your-username/devcom.git
cd devcom
npm install
```

---

## 🗂️ .env Example

Create a `.env` file in the root directory with the following content:

```env
# JWT Secret
JWT_SECRET=your_jwt_secret

# PostgreSQL Docker Setup
POSTGRES_USER=devuser
POSTGRES_PASSWORD=devpassword
POSTGRES_DB=devcom
POSTGRES_PORT=5432

# Prisma Database URL (used in schema.prisma)
DATABASE_URL=postgresql://devuser:devpassword@localhost:5432/devcom
```

---

## 🛠️ Prisma Setup

1. Run migration and generate Prisma Client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

## 🚀 Start the Development Server

```bash
npm run dev
```

---

## 📦 Available Scripts

In your `package.json`, add the following:

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## 🐳 Docker Notes

- Ensure Docker is running before starting the server.
- `docker-compose up -d` starts your PostgreSQL database.
- `docker-compose down` stops and removes containers.

---

## 🔐 Authentication Notes

- Passport.js handles authentication using JWT tokens.
- Token is generated at login using `generateToken` function.
- Tokens are verified via Passport’s JWT Strategy for route protection.

---

## 📋 Deployment (e.g., Render)

1. Render automatically runs `npm install`, `npm run build`, then `npm start`.
2. Make sure `tsconfig.json` and TypeScript source files are pushed to Git.
3. Add your production `.env` variables on Render’s dashboard.

---

## 📄 License

MIT
