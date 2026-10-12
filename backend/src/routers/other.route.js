import help from "../controllers/help.controller.js";
import health from "../controllers/health.controller.js";

export default async function otherRouter(fastify, options) {
  fastify.get("/help", help);
  fastify.get("/health", health);
}
