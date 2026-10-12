import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  configDotenv({ path: path.resolve(__dirname, "../../.env") });
}

const connect = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI environment variable is not defined!");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully to Atlas cluster");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected.");
});

export default connect;
