# JokeVault

> **The Ultimate Fullstack Comedy & Joke Platform**, migrated to ultra-fast **Fastify** with a modern **React 19 + Vite** frontend.

![Fastify](https://img.shields.io/badge/Fastify-5.2-black?style=for-the-badge&logo=fastify)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-Cache-red?style=for-the-badge&logo=redis)

---

## Why JokeVault? (Repository Comparison & Consolidation)

Among the three repositories (`joke`, `jokeAPI`, and `jokevault`), **`jokevault`** was selected as the foundation because it is the only comprehensive fullstack project with:

- A complete, polished **React 19 + Vite + Tailwind** client application with interactive discovery, categorization, dashboards, and authentication.
- A fully structured backend with MongoDB models, Redis caching, JWT authentication, and administrative controls.

### Best Features Consolidated From Other Repos:

- **From `joke`**:
  - Integrated flexible random joke sampling (`$sample`) directly into `/api/v1/j/joke` and `/api/v1/j/jokes` without requiring strict query tags.
  - Added sampling count parameters for bulk random discoveries.
- **From `jokeAPI`**:
  - Unified status codes and constants.
  - Interactive API documentation helper at `/api/v1/help`.
  - Comprehensive `.env.example` configurations.
  - Strict standardized `ApiResponse` and `ApiErrorResponse` structures.
- **Fixed Core Vulnerabilities & Bugs**:
  - Fixed typo in role verification (`role.inclues` ➔ `role.includes`).
  - Fixed password validation regexes in registration (`/d/`, `/s/`, `/W/` ➔ `/\d/`, `/\s/`, `/\W/`).
  - Awaited async password verification (`await user.comparePassword(password)`).
  - Fixed cache profile name undefined reference (`user.userName` ➔ `exist.userName`).
  - Fixed typo in session check (`exsit.role` ➔ `exist.role`).
  - Inverted local dev cookie security flag to support local HTTP development.
  - Created a frontend API client (`src/services/api.js`) to connect frontend with backend.

---

## ⚡ Fastify Migration Highlights

- **5x Throughput**: Migrated Express 5 routes to native asynchronous Fastify plugins.
- **Plugins Registered**:
  - `@fastify/cors`: Flexible cross-origin resource sharing with credential support.
  - `@fastify/helmet`: Robust HTTP headers with CSP configured for UI helper assets.
  - `@fastify/cookie`: Signed cookie handling for access and refresh JWT tokens.
  - `@fastify/rate-limit`: DDoS protection with 120 requests/minute per client.
  - `@fastify/static`: High-performance static asset serving from `/public`.
  - `@fastify/formbody`: URL-encoded payload parsing.
- **Resilient Redis**:
  - Added seamless fallback to in-memory caching if Redis is offline or not configured.
- **Graceful Shutdown**:
  - Listens to `SIGINT` and `SIGTERM` signals to cleanly drain active requests.

---

## Project Structure

```
jokevault/
├── backend/
│   ├── server.js                     # Fastify startup & lifecycle
│   ├── src/
│   │   ├── config/
│   │   │   ├── app.js               # Fastify plugins, error handlers & routing
│   │   │   ├── mongoDB.js           # Mongoose connection
│   │   │   └── redis.js             # Redis client with in-memory fallback
│   │   ├── controllers/             # Fastify request handlers
│   │   │   ├── joke.controller.js   # Joke CRUD, tags, sampling, pagination
│   │   │   ├── user.controller.js   # Auth, JWT, profiles, admin controls
│   │   │   ├── health.controller.js # Health metrics endpoint
│   │   │   ├── help.controller.js   # Documentation controller
│   │   │   └── cron.controller.js   # Scheduled upkeep tasks
│   │   ├── middlewares/             # Fastify preHandler hooks
│   │   ├── models/                  # Mongoose data schemas
│   │   ├── routers/                 # Fastify plugin route modules
│   │   └── utils/                   # Shared response, token, and status utilities
│   └── public/                      # Static assets & help.html
│
├── frontend/
│   ├── src/
│   │   ├── components/              # Shared UI components
│   │   ├── pages/                   # Homepage, Categories, Search, Dashboard, Auth
│   │   ├── services/api.js          # Unified axios client for Fastify backend
│   │   └── Routes.jsx               # React Router definitions
│   └── vite.config.mjs              # Vite configuration
│
└── package.json                     # Monorepo concurrent runner scripts
```

---

## Quick Start

### 1. Prerequisites

- Node.js (v18+) or Bun
- MongoDB Atlas or local MongoDB instance
- (Optional) Redis

### 2. Environment Setup

Copy `.env.example` in `backend/`:

```bash
cp backend/.env.example backend/.env
```

Fill in your `MONGO_URI` (and optional `REDIS`).

### 3. Install & Run

From the root `jokevault` directory:

```bash
# Run both backend & frontend concurrently
npm run dev

# Or run separately:
npm run dev:backend   # Fastify server on http://localhost:4000
npm run dev:frontend  # React Vite app on http://localhost:5173
```

---

## API Reference

Base URL: `http://localhost:4000/api/v1`

| Method   | Endpoint            | Description                                   | Auth   |
| -------- | ------------------- | --------------------------------------------- | ------ |
| `GET`    | `/`                 | API Root & overview                           | Public |
| `GET`    | `/health`           | Server uptime & memory stats                  | Public |
| `GET`    | `/help`             | Interactive API documentation UI              | Public |
| `GET`    | `/j/joke`           | Random joke (optional `?tags=sfw`)            | Public |
| `GET`    | `/j/jokes`          | Multiple jokes (optional `?tags=dad&count=5`) | Public |
| `GET`    | `/j/tags`           | List all available joke tags (cached)         | Public |
| `GET`    | `/j/page`           | Paginated jokes (`?page=1&limit=10`)          | Public |
| `GET`    | `/j/id/:id` or `/j/:id` | Fetch joke by MongoDB ID                      | Public |
| `POST`   | `/j` or `/j/joke`   | Submit a new joke                             | Admin  |
| `PUT`    | `/j/:id`            | Full update joke by ID                        | Admin  |
| `PATCH`  | `/j/:id`            | Partial update joke by ID                     | Admin  |
| `DELETE` | `/j/:id`            | Delete joke by ID                             | Admin  |
| `POST`   | `/u/register`       | Register new account                          | Public |
| `POST`   | `/u/login`          | Login & receive JWT cookies                   | Public |
| `POST`   | `/u/logout`         | Logout & clear session                        | Public |
| `GET`    | `/u/profile/:id`    | Get user profile                              | Public |
| `PATCH`  | `/u/profile/update` | Update user bio/socials                       | User   |
| `PATCH`  | `/u/role/:id`       | Update user role (promote/demote)             | Admin  |
| `GET`    | `/u/all-users`      | List community members                        | Public |
