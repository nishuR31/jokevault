export default function cookieOptions(type = "access") {
  const isProd = process.env.NODE_ENV === "production" || process.env.PRODUCTION === "true";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * (type === "access" ? 1 : 7), // 1 or 7 days
  };
}
