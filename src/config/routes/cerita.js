const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

router.post("/", async (req, res) => {
  try {
    const { cerita } = req.body;
    const userId = req.user.id; // Asumsikan Anda telah mengimplementasikan autentikasi pengguna
    const username = req.user.username;

    // Simpan cerita ke database
    const [result] = await pool.query(
      "INSERT INTO cerita (id_user, username, cerita, date_created) VALUES (?, ?, ?, NOW())",
      [userId, username, cerita]
    );

    res
      .status(201)
      .json({ message: "Cerita berhasil disimpan", ceritaId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});
