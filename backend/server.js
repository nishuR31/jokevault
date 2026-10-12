import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
configDotenv({ path: path.resolve(__dirname, ".env") });

import app from "./src/config/app.js";
import connect from "./src/config/mongoDB.js";
import { connectRedis } from "./src/config/redis.js";
import cronJob from "./src/controllers/cron.controller.js";

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

async function fireUp() {
  await connect();
  await connectRedis();

  try {
    const address = await app.listen({ port, host });
    cronJob();
    console.log(`JokeVault Fastify Server is running at: ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown handling
const signals = ["SIGINT", "SIGTERM"];
for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`\n Received ${signal}, closing Fastify server gracefully...`);
    await app.close();
    process.exit(0);
  });
}

fireUp();
