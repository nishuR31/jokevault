import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import rateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import codes from "../utils/statusCodes.js";

import jokeRouter from "../routers/joke.router.js";
import userRouter from "../routers/user.router.js";
import otherRouter from "../routers/other.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../../public");

const app = Fastify({
  logger: process.env.NODE_ENV === "test" ? false : {
    level: process.env.LOG_LEVEL || "info",
  },
});

// Register Plugins
await app.register(cors, {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

await app.register(helmet, {
  contentSecurityPolicy: false, // Allows inline CDN resources in help.html
});

await app.register(cookie, {
  secret: process.env.COOKIE_SECRET || "jokevault-cookie-secret-key-999",
  parseOptions: {},
});

await app.register(formbody);

await app.register(rateLimit, {
  max: 120,
  timeWindow: "1 minute",
  errorResponseBuilder: (request, context) => ({
    success: false,
    code: codes.tooManyRequest,
    message: "Rate limit exceeded. Please wait a minute before making more requests.",
    payload: {
      timeWindow: context.after,
      max: context.max,
    },
  }),
});

await app.register(fastifyStatic, {
  root: publicDir,
  prefix: "/public/",
});

// API Routes
const baseRoute = "/api/v1";
await app.register(jokeRouter, { prefix: `${baseRoute}/j` });
await app.register(userRouter, { prefix: `${baseRoute}/u` });
await app.register(otherRouter, { prefix: `${baseRoute}` });

// Root Welcome Route
app.get("/", async (request, reply) => {
  return reply.status(codes.ok).send(
    new ApiResponse("JokeVault Fastify API Server is fired up and ready! 🚀", codes.ok, {
      documentation: `${baseRoute}/help`,
      health: `${baseRoute}/health`,
      endpoints: {
        randomJoke: `${baseRoute}/j/joke`,
        allJokes: `${baseRoute}/j/jokes`,
        tags: `${baseRoute}/j/tags`,
        pagination: `${baseRoute}/j/page?page=1&limit=10`,
        users: `${baseRoute}/u/all-users`,
      },
    }).res()
  );
});

// Custom 404 Handler
app.setNotFoundHandler((request, reply) => {
  reply.status(codes.notFound).send(
    new ApiErrorResponse("Route not found", codes.notFound, {
      route: request.url,
      method: request.method,
    }).res()
  );
});

// Global Error Handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  const statusCode = error.statusCode || codes.internalServerError;
  reply.status(statusCode).send(
    new ApiErrorResponse(
      error.message || "An unexpected error occurred",
      statusCode,
      {},
      process.env.DEV ? error.stack : undefined
    ).res()
  );
});

export default app;
