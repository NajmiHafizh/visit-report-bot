const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

require("dotenv").config();

async function sendPhoto() {

    const form = new FormData();

    form.append("chat_id", process.env.CHAT_ID);

    form.append(
        "photo",
        fs.createReadStream("./screenshots/report.png")
    );

    // Ambil bulan dan tahun otomatis
    const now = new Date();

    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const namaBulan = bulan[now.getMonth()];
    const tahun = now.getFullYear();

    // Caption
    const caption =
`<b>[DAILY REPORT VISITING]</b>

Selamat sore, mohon izin rekans SOCC dan bapak ibu HOTD.

Berikut kami sampaikan progress visiting untuk rekans SOCC dan bapak ibu HOTD bulan <b>${namaBulan} ${tahun}</b>.

Terima kasih.`;

    form.append("caption", caption);
    form.append("parse_mode", "HTML");

    await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`,
        form,
        {
            headers: form.getHeaders()
        }
    );

    console.log("Foto berhasil dikirim ke Telegram");

}

module.exports = sendPhoto;