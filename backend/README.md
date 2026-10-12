# JokeVault Fastify Backend

High-performance REST API powered by **Fastify**, **MongoDB (Mongoose)**, and **Redis**.

## Key Features

- **Fastify 5 Framework**: Lightning fast HTTP pipeline with native JSON schema acceleration.
- **Resilient Caching**: Redis-backed tag and profile caching with automatic in-memory fallback.
- **JWT & Cookie Auth**: Secure HttpOnly cookie handling and Bearer token verification.
- **Sampling & Pagination**: Random joke sampling inspired by the `joke` repository + cursor pagination.
- **Security**: Hardened with `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit`, and bcrypt password hashing.

## Environment Variables

Create `.env` using `.env.example`:

```env
PORT=4000
HOST=0.0.0.0
MONGO_URI=mongodb+srv://...
REDIS=redis://127.0.0.1:6379
SECRET_ACC=your_jwt_access_secret
SECRET_REF=your_jwt_refresh_secret
COOKIE_SECRET=your_cookie_signing_secret
PRODUCTION=false
```

## Running the Server

```bash
# Development (with watch mode)
npm run dev

# Production
npm start
```
