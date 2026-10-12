import jwt from "jsonwebtoken";
import tokenOptions from "./tokenOptions.js";

const DEFAULT_ACCESS_SECRET = "jokevault_default_access_secret_key_2026";
const DEFAULT_REFRESH_SECRET = "jokevault_default_refresh_secret_key_2026";

function accessToken(payload) {
  const secret = process.env.SECRET_ACC || DEFAULT_ACCESS_SECRET;
  return jwt.sign(payload, secret, tokenOptions("access"));
}

function refreshToken(payload) {
  const secret = process.env.SECRET_REF || DEFAULT_REFRESH_SECRET;
  return jwt.sign(payload, secret, tokenOptions("refresh"));
}

function tokens(payload) {
  return {
    refreshToken: refreshToken(payload),
    accessToken: accessToken(payload),
  };
}

function verifyAccess(token) {
  const secret = process.env.SECRET_ACC || DEFAULT_ACCESS_SECRET;
  return jwt.verify(token, secret);
}

function verifyRefresh(token) {
  const secret = process.env.SECRET_REF || DEFAULT_REFRESH_SECRET;
  return jwt.verify(token, secret);
}

export { accessToken, refreshToken, tokens, verifyAccess, verifyRefresh };
