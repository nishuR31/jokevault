import codes from "../utils/statusCodes.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

/**
 * Authentication Middleware
 * Validates JWT access token (from Authorization header or cookie)
 * or falls back to refresh token if available.
 */
export const auth = (need = true) => {
  return async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      let accessToken =
        authHeader && authHeader.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : request.cookies?.accessToken;

      let refreshToken = request.cookies?.refreshToken;

      request.user = null;

      if (!accessToken && !refreshToken) {
        if (need) {
          return reply
            .status(codes.unauthorized)
            .send(
              new ApiErrorResponse(
                "Authentication required: Please provide a valid Bearer token or login.",
                codes.unauthorized
              ).res()
            );
        }
        return;
      }

      let decoded = null;

      // Try access token first
      if (accessToken) {
        try {
          decoded = verifyAccess(accessToken);
        } catch (err) {
          // If access token expired but refresh token exists, fall through to refresh token
          if (!refreshToken && need) {
            return reply
              .status(codes.unauthorized)
              .send(
                new ApiErrorResponse(
                  "Invalid or expired access token",
                  codes.unauthorized
                ).res()
              );
          }
        }
      }

      // Fallback to refresh token if access token failed/was omitted
      if (!decoded && refreshToken) {
        try {
          decoded = verifyRefresh(refreshToken);
        } catch (err) {
          if (need) {
            return reply
              .status(codes.unauthorized)
              .send(
                new ApiErrorResponse(
                  "Invalid or expired refresh token",
                  codes.unauthorized
                ).res()
              );
          }
        }
      }

      if (!decoded) {
        if (need) {
          return reply
            .status(codes.unauthorized)
            .send(
              new ApiErrorResponse(
                "Authentication failed: Invalid credentials",
                codes.unauthorized
              ).res()
            );
        }
        return;
      }

      let user = null;
      if (mongoose.connection.readyState === 1) {
        try {
          user = await User.findById(decoded._id).lean();
        } catch {
          // fallback
        }
      }

      if (!user && decoded.role) {
        user = {
          _id: decoded._id,
          userName: decoded.userName,
          role: decoded.role,
        };
      }

      if (!user) {
        if (need) {
          return reply
            .status(codes.unauthorized)
            .send(
              new ApiErrorResponse("User account not found", codes.unauthorized).res()
            );
        }
        return;
      }

      request.user = {
        userName: user.userName,
        _id: user._id.toString(),
        role: Array.isArray(user.role) ? user.role : [user.role],
      };
    } catch (err) {
      if (need) {
        return reply
          .status(codes.unauthorized)
          .send(
            new ApiErrorResponse(
              "Authentication failed",
              codes.unauthorized,
              {},
              err.message
            ).res()
          );
      }
    }
  };
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Verifies that the authenticated user possesses one of the authorized roles.
 * Default role is 'user'. Modifying jokes requires 'admin' (or developer/admin).
 */
export const authorize = (...allowedRoles) => {
  return async (request, reply) => {
    if (!request.user) {
      return reply
        .status(codes.unauthorized)
        .send(
          new ApiErrorResponse(
            "Authentication required before accessing this protected resource",
            codes.unauthorized
          ).res()
        );
    }

    const userRoles = Array.isArray(request.user.role)
      ? request.user.role
      : [request.user.role];

    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      return reply.status(codes.forbidden).send(
        new ApiErrorResponse(
          `Forbidden: Access requires role [${allowedRoles.join(", ")}]. Users with role [${userRoles.join(", ")}] have read-only access to jokes and cannot create, modify, or delete jokes.`,
          codes.forbidden,
          {
            requiredRoles: allowedRoles,
            userRoles,
          }
        ).res()
      );
    }
  };
};

export default auth;
