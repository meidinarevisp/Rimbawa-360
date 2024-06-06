const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const multer = require("multer");

const path = require("path");
const fs = require("fs");

// Gunakan __dirname untuk mendapatkan direktori saat ini
const currentDir = path.dirname(__filename);
const projectRoot = path.join(currentDir, "../../");
const uploadDir = path.join(projectRoot, "public", "uploads");

// Buat direktori jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Gunakan uploadDir yang sudah kita definisikan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Hanya file gambar yang diizinkan!"), false);
    }
    cb(null, true);
  },
});

router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM direktori");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM direktori WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const {
      nama_tempat,
      lokasi,
      latitude,
      longitude,
      deskripsi,
      aktivitas,
      akses,
      fasilitas,
    } = req.body;

    let gambar = null;
    if (req.file) {
      gambar = req.file.filename;
    } else {
      return res.status(400).json({ error: "Gambar harus diunggah" });
    }

    const [result] = await pool.query(
      "INSERT INTO direktori (nama_tempat, lokasi, latitude, longitude, deskripsi, aktivitas, akses, fasilitas, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nama_tempat,
        lokasi,
        latitude,
        longitude,
        deskripsi,
        aktivitas,
        akses,
        fasilitas,
        gambar,
      ]
    );

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      id: result.insertId,
      gambarUrl: `/uploads/${gambar}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("gambar"), async (req, res) => {
  const {
    nama_tempat,
    lokasi,
    latitude,
    longitude,
    deskripsi,
    aktivitas,
    akses,
    fasilitas,
  } = req.body;

  let gambar = req.file ? req.file.filename : null;

  try {
    const [rows] = await pool.query(
      "SELECT gambar FROM direktori WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const oldImage = rows[0].gambar;

    if (gambar) {
      const oldImagePath = path.join(uploadDir, oldImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    } else {
      gambar = oldImage;
    }

    const [result] = await pool.query(
      "UPDATE direktori SET nama_tempat = ?, lokasi = ?, latitude = ?, longitude = ?, deskripsi = ?, aktivitas = ?, akses = ?, fasilitas = ?, gambar = ? WHERE id = ?",
      [
        nama_tempat,
        lokasi,
        latitude,
        longitude,
        deskripsi,
        aktivitas,
        akses,
        fasilitas,
        gambar,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Data berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT gambar FROM direktori WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const oldImage = rows[0].gambar;
    const oldImagePath = path.join(uploadDir, oldImage);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    const [result] = await pool.query("DELETE FROM direktori WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
