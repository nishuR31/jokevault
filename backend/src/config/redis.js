import { createClient } from "redis";

let red = null;
let isRedisConnected = false;
const inMemoryCache = new Map();

export async function connectRedis() {
  const redisUrl = process.env.REDIS || process.env.REDIS_URL;
  if (!redisUrl) {
    console.log("ℹ No REDIS url configured. Operating with in-memory cache fallback.");
    return;
  }

  try {
    red = createClient({ url: redisUrl });
    red.on("error", (err) => {
      console.warn(`Redis warning: ${err.message}`);
      isRedisConnected = false;
    });
    red.on("ready", () => {
      isRedisConnected = true;
      console.log("Redis connected & ready.");
    });
    await red.connect();
    isRedisConnected = true;
    console.log("Redis client initialized successfully.");
  } catch (err) {
    console.warn(`Redis connection failed: ${err.message}. Using in-memory cache fallback.`);
    isRedisConnected = false;
  }
}

export async function cacheGet(key, field) {
  try {
    if (isRedisConnected && red) {
      if (field) {
        return await red.hGet(key, field);
      }
      return await red.get(key);
    }
  } catch (err) {
    console.warn(`Cache get failed: ${err.message}`);
  }

  // In-memory fallback
  const mapKey = field ? `${key}:${field}` : key;
  return inMemoryCache.get(mapKey) ?? null;
}

export async function cacheSet(key, field, value) {
  try {
    if (isRedisConnected && red) {
      if (field) {
        return await red.hSet(key, field, value);
      }
      return await red.set(key, value);
    }
  } catch (err) {
    console.warn(`Cache set failed: ${err.message}`);
  }

  // In-memory fallback
  const mapKey = field ? `${key}:${field}` : key;
  inMemoryCache.set(mapKey, value);
  return true;
}

export async function cacheDel(...keys) {
  if (!keys || keys.length === 0) return;
  try {
    if (isRedisConnected && red) {
      const flatKeys = keys.filter(Boolean);
      if (flatKeys.length > 0) {
        await red.del(...flatKeys);
      }
    }
  } catch (err) {
    console.warn(`Cache delete failed: ${err.message}`);
  }

  for (const k of keys) {
    for (const inMemKey of inMemoryCache.keys()) {
      if (inMemKey === k || inMemKey.startsWith(`${k}:`)) {
        inMemoryCache.delete(inMemKey);
      }
    }
  }
}

export { red, isRedisConnected };
export default connectRedis;
