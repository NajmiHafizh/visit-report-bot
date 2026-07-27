const cron = require("node-cron");
const takeScreenshot = require("./screenshot");
const sendPhoto = require("./telegram");

console.log("🚀 Scheduler berjalan...");

cron.schedule(
    "0 17 * * 1-5",
    async () => {
        console.log("⏰ Menjalankan laporan pukul 17:00 WITA...");

        try {
            await takeScreenshot();
            await sendPhoto();

            console.log("✅ Laporan berhasil dikirim.");
        } catch (error) {
            console.error("❌ Gagal mengirim laporan:", error);
        }
    },
    {
        timezone: "Asia/Makassar"
    }
);