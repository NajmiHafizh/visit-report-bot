require("dotenv").config();

module.exports = {
  sheetUrl: process.env.SHEET_URL,
  screenshotPath: "./screenshots/report.png",

  viewport: {
    width: 1600,
    height: 900,
  },
};