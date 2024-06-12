const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("./auth");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "capstone";

router.post("/", verifyToken, async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const username = decoded.username;
    const gambar = decoded.gambar;

    const [result] = await pool.query(
      "INSERT INTO forum (id_user, username, judul, deskripsi, gambar, date_created) VALUES (?, ?, ?, ?, ?, NOW())",
      [userId, username, judul, deskripsi, gambar]
    );
    res.status(201).json({
      message: "Pesan berhasil ditambahkan",
      ceritaId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.get("/", async (req, res) => {
  try {
    const forumPosts = await pool.query("SELECT * FROM forum");
    res.json(forumPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const { id } = req.params;

    await pool.query("UPDATE forum SET judul = ?, deskripsi = ? WHERE id = ?", [
      judul,
      deskripsi,
      id,
    ]);

    res.json({ message: "Forum berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM forum WHERE id = ?", [id]);

    res.json({ message: "Forum berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

module.exports = router;
