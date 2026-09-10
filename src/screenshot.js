const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function takeScreenshot() {

    // Membuat folder screenshots otomatis jika belum ada
    const screenshotDir = path.join(__dirname, "..", "screenshots");

    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });

    try {

        const page = await browser.newPage();

        await page.goto(process.env.SHEET_URL, {
            waitUntil: "networkidle2"
        });

        // Tunggu Google Sheets selesai dimuat
        await new Promise(resolve => setTimeout(resolve, 6000));

        const element = await page.$(".grid-table-container");

        if (!element) {
            throw new Error("Elemen tabel Google Sheets tidak ditemukan.");
        }

        const boundingBox = await element.boundingBox();

        if (!boundingBox) {
            throw new Error("Gagal mendapatkan ukuran tabel.");
        }

        await page.screenshot({
            path: path.join(screenshotDir, "report.png"),
            clip: {
                x: boundingBox.x + 46,
                y: boundingBox.y + 22,
                width: 780,
                height: 272
            }
        });

        console.log("Screenshot berhasil dibuat.");

    } catch (error) {

        console.error("Gagal mengambil screenshot:", error.message);
        throw error;

    } finally {

        await browser.close();

    }
}

module.exports = takeScreenshot;