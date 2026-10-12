import {
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
  profile,
  updateUserRole,
  getMe,
} from "../controllers/user.controller.js";
import { auth, authorize } from "../middlewares/auth.middleware.js";

export default async function userRouter(fastify, options) {
  // Public user endpoints
  fastify.post("/register", register);
  fastify.post("/login", { preHandler: [auth(false)] }, login);
  fastify.get("/profile/:id", profile);
  fastify.get("/all-users", getAllUsers);

  // Authenticated cookie endpoints
  fastify.get("/me", { preHandler: [auth(true)] }, getMe);
  fastify.get("/logout", { preHandler: [auth(false)] }, logout);
  fastify.post("/logout", { preHandler: [auth(false)] }, logout);
  fastify.patch("/profile/update", { preHandler: [auth(true)] }, updateProfile);

  // RBAC Protected (Admin only)
  fastify.patch("/role/:id", { preHandler: [auth(true), authorize("admin")] }, updateUserRole);
}
