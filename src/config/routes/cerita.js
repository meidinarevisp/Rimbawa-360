const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("./auth");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "capstone";

router.post("/", verifyToken, async (req, res) => {
  try {
    const { cerita } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const username = decoded.username;
    const gambar = decoded.gambar;

    const [result] = await pool.query(
      "INSERT INTO cerita (id_user, username, cerita, gambar, date_created) VALUES (?, ?, ?, ?, NOW())",
      [userId, username, cerita, gambar]
    );
    res
      .status(201)
      .json({ message: "Cerita berhasil disimpan", ceritaId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cerita ORDER BY date_created DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const [rows] = await pool.query(
      "SELECT * FROM cerita WHERE id_user = ? ORDER BY date_created DESC",
      [userId]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ceritaId = req.params.id;
    const [rows] = await pool.query("SELECT * FROM cerita WHERE id = ?", [
      ceritaId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Cerita tidak ditemukan" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const ceritaId = req.params.id;
    const { cerita } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const username = decoded.username;
    const gambar = decoded.gambar;

    const [result] = await pool.query(
      "UPDATE cerita SET cerita = ?, gambar = ? WHERE id = ? AND id_user = ?",
      [cerita, gambar, ceritaId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cerita tidak ditemukan" });
    }

    res.status(200).json({ message: "Cerita berhasil diperbarui" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const ceritaId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const [result] = await pool.query(
      "DELETE FROM cerita WHERE id = ? AND id_user = ?",
      [ceritaId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cerita tidak ditemukan" });
    }

    res.status(200).json({ message: "Cerita berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

module.exports = router;
