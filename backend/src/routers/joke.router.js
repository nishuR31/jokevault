import {
  getJokes,
  getTags,
  getJoke,
  jokeId,
  editJoke,
  newJoke,
  deleteJoke,
  paginate,
} from "../controllers/joke.controller.js";
import { auth, authorize } from "../middlewares/auth.middleware.js";

export default async function jokeRouter(fastify, options) {
  // Discovery & listing endpoints
  fastify.get("/joke", getJoke);
  fastify.get("/jokes", getJokes);
  fastify.get("/jokes/random", getJoke);
  fastify.get("/tags", getTags);
  fastify.get("/page", paginate);

  // Creation (Admin only) - supports both /j and /j/joke
  fastify.post("/", { preHandler: [auth(true), authorize("admin")] }, newJoke);
  fastify.post("/joke", { preHandler: [auth(true), authorize("admin")] }, newJoke);

  // Unified RESTful route by ID (/api/v1/j/:id) based on HTTP methods
  // GET: fetch joke by ID (Public / User)
  fastify.get("/:id", jokeId);
  fastify.get("/id/:id", jokeId); // backwards compatibility alias

  // PUT & PATCH: update joke by ID (Admin only)
  fastify.put("/:id", { preHandler: [auth(true), authorize("admin")] }, editJoke);
  fastify.patch("/:id", { preHandler: [auth(true), authorize("admin")] }, editJoke);

  // DELETE: delete joke by ID (Admin only)
  fastify.delete("/:id", { preHandler: [auth(true), authorize("admin")] }, deleteJoke);

  // Backwards compatibility aliases
  fastify.put("/:id/edit", { preHandler: [auth(true), authorize("admin")] }, editJoke);
  fastify.delete("/:id/delete", { preHandler: [auth(true), authorize("admin")] }, deleteJoke);
}
