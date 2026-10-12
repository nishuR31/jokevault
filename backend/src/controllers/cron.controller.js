import cron from "node-cron";
import axios from "axios";

export default function cronJob() {
  const port = process.env.PORT || 4000;
  try {
    // Run keep-alive / health self-check every 15 minutes
    cron.schedule("*/15 * * * *", async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:${port}/api/v1/health`);
        if (res.data?.success) {
          console.log(`[Cron] Keep-alive health check passed: ${new Date().toLocaleTimeString()}`);
        }
      } catch (err) {
        console.warn(`[Cron] Health check ping warning: ${err.message}`);
      }
    });
    console.log("JokeVault scheduled tasks initialized.");
  } catch (err) {
    console.error(`Fatal error in health cron job: ${err.message}`);
  }
}
