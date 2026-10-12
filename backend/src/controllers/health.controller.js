import ApiResponse from "../utils/apiResponse.js";
import codes from "../utils/statusCodes.js";

export async function health(request, reply) {
  const memoryUsage = process.memoryUsage();
  return reply.status(codes.ok).send(
    new ApiResponse("JokeVault Fastify server is running smoothly!", codes.ok, {
      status: "healthy",
      framework: "Fastify",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      memory: {
        rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      },
      request: {
        protocol: request.protocol,
        hostname: request.hostname,
        url: request.url,
        ip: request.ip,
      },
    }).res()
  );
}

export default health;
