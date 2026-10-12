import User from "../models/user.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import codes from "../utils/statusCodes.js";
import hideEmail from "../utils/hideEmail.js";
import isEmpty from "../utils/isEmpty.js";
import { tokens } from "../utils/tokenization.js";
import cookieOptions from "../utils/cookieOptions.js";
import { cacheGet, cacheSet, cacheDel } from "../config/redis.js";
import mongoose from "mongoose";

const roles = ["user", "admin"];

/////////////////////////////////////////////////////////////////

export async function register(request, reply) {
  let { firstName, lastName, email, password, userName, username, role } = request.body || {};
  userName = userName || username;

  if (!email || !password || !userName) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Username, email, and password are required.",
          codes.badRequest
        ).res()
      );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (role && !roles.includes(role)) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("Invalid role", codes.badRequest).res());
  }

  if (!emailRegex.test(email)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse("Invalid email format.", codes.badRequest).res()
      );
  }

  if (password.length < 8) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must be at least 8 characters long.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\d/.test(password)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must have at least one digit [0-9].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[a-z]/.test(password)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must have a lowercase character [a-z].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[A-Z]/.test(password)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must have an uppercase character [A-Z].",
          codes.badRequest
        ).res()
      );
  }

  if (/\s/.test(password)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must not have any spaces.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\W/.test(password)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Password must have a special symbol [!, @, #, etc.].",
          codes.badRequest
        ).res()
      );
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    return reply
      .status(codes.conflict)
      .send(
        new ApiErrorResponse("Email is already registered.", codes.conflict).res()
      );
  }

  const existingUsername = await User.findOne({ userName: userName.toLowerCase() });
  if (existingUsername) {
    return reply
      .status(codes.conflict)
      .send(
        new ApiErrorResponse(
          `Username '${userName}' is already taken.`,
          codes.conflict
        ).res()
      );
  }

  // RBAC: Default role is strictly 'user'.
  // Admin role can be assigned if adminSecretKey matches process.env.KEY or in dev with 'developer'
  let assignedRole = ["user"];
  if (role === "admin") {
    const adminSecret = request.body?.adminSecretKey;
    const isDev = process.env.NODE_ENV !== "production";
    if (adminSecret && (adminSecret === process.env.KEY || (isDev && adminSecret === "developer"))) {
      assignedRole = ["admin", "user"];
    }
  }

  const user = await User.create({
    firstName: firstName || userName,
    lastName: lastName || "",
    email: email.toLowerCase(),
    password,
    userName: userName.toLowerCase(),
    role: assignedRole,
  });

  return reply.status(codes.created).send(
    new ApiResponse(
      "Account registered successfully. You can now login.",
      codes.created,
      {
        _id: user._id,
        userName: user.userName,
        email: hideEmail(user.email),
        photoUrl: user.photoUrl,
      }
    ).res()
  );
}

/////////////////////////////////////////////////////////////////

export async function login(request, reply) {
  let { emailUser, email, userName, username, password } = request.body || {};
  emailUser = emailUser || email || userName || username;

  if (!emailUser || !password) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Username/email and password are required.",
          codes.badRequest
        ).res()
      );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(emailUser);
  const query = isEmail
    ? { email: emailUser.toLowerCase() }
    : { userName: emailUser.toLowerCase() };

  const user = await User.findOne(query);
  if (!user) {
    return reply
      .status(codes.notFound)
      .send(
        new ApiErrorResponse(
          "Account credentials do not match our records.",
          codes.notFound
        ).res()
      );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return reply
      .status(codes.unauthorized)
      .send(new ApiErrorResponse("Invalid password.", codes.unauthorized).res());
  }

  const payload = {
    _id: user._id.toString(),
    userName: user.userName,
    role: user.role,
  };
  const { accessToken, refreshToken } = tokens(payload);

  user.refreshToken = refreshToken;
  await user.save();

  // Cache user session
  await cacheSet(`user:${user._id}:session`, "data", JSON.stringify(payload));

  reply.setCookie("accessToken", accessToken, cookieOptions("access"));
  reply.setCookie("refreshToken", refreshToken, cookieOptions("refresh"));

  return reply.status(codes.ok).send(
    new ApiResponse(
      `Welcome back, ${user.userName}!`,
      codes.ok,
      {
        user: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          bio: user.bio,
          occupation: user.occupation,
          photoUrl: user.photoUrl,
          instagram: user.instagram,
          linkedin: user.linkedin,
          github: user.github,
          facebook: user.facebook,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
      }
    ).res()
  );
}

////////////////////////////////////////////////////////////////////////////

export async function profile(request, reply) {
  let { id } = request.params;

  const cached = await cacheGet(`user:${id}:profile`, "data");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return reply.status(codes.ok).send(
        new ApiResponse(`User ${parsed.userName} profile (cached)`, codes.ok, {
          user: parsed,
        }).res()
      );
    } catch {
      // ignore parse error
    }
  }

  const user = await User.findById(id).select("-password -refreshToken -otp -__v");
  if (!user) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("User not found.", codes.notFound).res());
  }

  const userData = {
    _id: user._id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio,
    occupation: user.occupation,
    photoUrl: user.photoUrl,
    instagram: user.instagram,
    linkedin: user.linkedin,
    github: user.github,
    facebook: user.facebook,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  await cacheSet(`user:${id}:profile`, "data", JSON.stringify(userData));

  return reply.status(codes.ok).send(
    new ApiResponse(`User ${user.userName} profile found`, codes.ok, {
      user: userData,
    }).res()
  );
}

/////////////////////////////////////////////////////////////

export async function logout(request, reply) {
  if (request.user?._id) {
    await cacheDel(`user:${request.user._id}:session`, `user:${request.user._id}:profile`);
    await User.findByIdAndUpdate(request.user._id, { $unset: { refreshToken: 1 } });
  }

  reply.clearCookie("accessToken", { path: "/" });
  reply.clearCookie("refreshToken", { path: "/" });

  return reply
    .status(codes.ok)
    .send(new ApiResponse("You have been successfully logged out.", codes.ok).res());
}

/////////////////////////////////////////////////////////////

export async function getMe(request, reply) {
  if (!request.user?._id) {
    return reply
      .status(codes.unauthorized)
      .send(new ApiErrorResponse("Session expired or not logged in", codes.unauthorized).res());
  }

  let user = null;
  if (mongoose.connection.readyState === 1) {
    try {
      user = await User.findById(request.user._id)
        .select("-password -refreshToken -otp -__v")
        .lean();
    } catch {
      user = request.user;
    }
  }

  if (!user) {
    user = request.user;
  }

  return reply.status(codes.ok).send(
    new ApiResponse("Session verified via cookie", codes.ok, {
      user: {
        _id: user._id.toString(),
        userName: user.userName,
        firstName: user.firstName || user.userName,
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        role: Array.isArray(user.role) ? user.role : [user.role],
        createdAt: user.createdAt || new Date(),
      },
    }).res()
  );
}

///////////////////////////////////////////////

export async function updateProfile(request, reply) {
  if (!request.user?._id) {
    return reply
      .status(codes.unauthorized)
      .send(
        new ApiErrorResponse(
          "Please log in before updating your profile.",
          codes.unauthorized
        ).res()
      );
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "bio",
    "occupation",
    "photoUrl",
    "instagram",
    "linkedin",
    "github",
    "facebook",
  ];

  const updates = {};
  for (const field of allowedFields) {
    if (request.body[field] !== undefined) {
      updates[field] = request.body[field];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    request.user._id,
    updates,
    { new: true, runValidators: true }
  ).select("-password -refreshToken -otp -__v");

  if (!updatedUser) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("User account not found.", codes.notFound).res());
  }

  await cacheDel(`user:${request.user._id}:profile`);

  return reply.status(codes.ok).send(
    new ApiResponse("Profile updated successfully.", codes.ok, {
      user: updatedUser,
    }).res()
  );
}

/////////////////////////////////////////////////////////////

export async function getAllUsers(request, reply) {
  const users = await User.find()
    .select("userName firstName lastName photoUrl bio occupation role createdAt")
    .limit(50)
    .lean();

  return reply.status(codes.ok).send(
    new ApiResponse("Users fetched successfully.", codes.ok, {
      users,
      total: users.length,
    }).res()
  );
}

/////////////////////////////////////////////////////////////

export async function updateUserRole(request, reply) {
  const { id } = request.params;
  const { role } = request.body || {};

  if (!role || !roles.includes(role)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Valid role ('user' or 'admin') is required.",
          codes.badRequest
        ).res()
      );
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role: [role] },
    { new: true }
  ).select("userName email role");

  if (!user) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("User not found.", codes.notFound).res());
  }

  await cacheDel(`user:${id}:profile`, `user:${id}:session`);

  return reply.status(codes.ok).send(
    new ApiResponse(`User role updated to ${role} successfully.`, codes.ok, {
      user,
    }).res()
  );
}
