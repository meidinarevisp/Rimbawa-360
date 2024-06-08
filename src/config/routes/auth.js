const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const gambar = path.join(__dirname, "../../public/images/user.png");

// Role constants
const USER_ROLE = 2;
const ADMIN_ROLE = 1;

router.use(fileUpload());

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Nama lengkap diperlukan."),
    body("username").notEmpty().withMessage("Nama pengguna diperlukan."),
    body("email").isEmail().withMessage("Email tidak valid."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Kata sandi minimal 6 karakter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, email, password } = req.body;
    try {
      // Check if email or username already exists
      const [userExists] = await pool.query(
        "SELECT id_user FROM auth WHERE email = ? OR username = ?",
        [email, username]
      );
      if (userExists.length > 0) {
        return res
          .status(400)
          .json({ error: "Email atau Nama pengguna sudah terdaftar." });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle image upload or set default image
      let gambar = "/images/user.png"; // Default image URL
      if (req.files && req.files.image) {
        const image = req.files.image;
        const fileName = `${Date.now()}_${image.name}`;
        const uploadPath = path.join(
          __dirname,
          "../../public/images",
          fileName
        );
        await image.mv(uploadPath);
        gambar = `/images/${fileName}`;
      }

      // Insert new user into the database
      const [result] = await pool.query(
        "INSERT INTO auth (nama_pengguna, email, username, password, role_id, date_created, gambar) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, email, username, hashedPassword, USER_ROLE, new Date(), gambar]
      );
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login endpoint
router.post(
  "/login",
  [
    body("login")
      .notEmpty()
      .withMessage("Email atau Nama pengguna diperlukan."),
    body("password").notEmpty().withMessage("Kata sandi diperlukan."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    try {
      // Find user by email or username
      const [users] = await pool.query(
        "SELECT * FROM auth WHERE email = ? OR username = ?",
        [login, login]
      );

      if (users.length === 0) {
        return res.status(401).json({ error: "Pengguna tidak ditemukan." });
      }

      const user = users[0];

      // Compare the password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Kata sandi salah." });
      }

      // Determine where to redirect based on role
      let redirectUrl;
      if (user.role_id === ADMIN_ROLE) {
        redirectUrl = "/#/dashboard-admin";
      } else if (user.role_id === USER_ROLE) {
        redirectUrl = "/#/beranda";
      } else {
        return res.status(403).json({ error: "Role pengguna tidak valid." });
      }

      // Respond with user information and redirect URL
      res.status(200).json({
        message: "Login berhasil!",
        user: {
          id_user: user.id_user,
          name: user.nama_pengguna,
          email: user.email,
          username: user.username, // tambahkan username
          role_id: user.role_id,
          gambar: user.gambar,
        },
        redirectUrl,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Update user profile endpoint
router.put(
  "/update-profile/:username",
  [
    body("name").notEmpty().withMessage("Nama lengkap diperlukan."),
    body("email").isEmail().withMessage("Email tidak valid."),
    body("newUsername")
      .notEmpty()
      .withMessage("Username baru diperlukan.")
      .custom(async (value, { req }) => {
        const [existingUsers] = await pool.query(
          "SELECT * FROM auth WHERE username = ? AND username != ?",
          [value, req.params.username]
        );
        if (existingUsers.length > 0) {
          throw new Error("Username sudah digunakan.");
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, newUsername } = req.body;
    const username = req.params.username;

    try {
      const [users] = await pool.query(
        "SELECT * FROM auth WHERE username = ?",
        [username]
      );
      if (users.length === 0) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
      }

      const user = users[0];

      const isDataChanged =
        name !== user.nama_pengguna ||
        email !== user.email ||
        newUsername !== user.username ||
        (req.files && req.files.image);

      if (!isDataChanged) {
        return res.status(400).json({ error: "Ubah dulu yaa!" });
      }

      let gambar = user.gambar;
      if (req.files && req.files.image) {
        const image = req.files.image;
        const fileName = `${Date.now()}_${image.name}`;
        const uploadPath = path.join(
          __dirname,
          "../../public/profiles",
          fileName
        );

        // Hapus gambar lama jika bukan gambar default
        if (user.gambar && user.gambar !== "/images/user.png") {
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            user.gambar
          );
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }

        await image.mv(uploadPath);
        gambar = `/profiles/${fileName}`;
      }

      const [result] = await pool.query(
        "UPDATE auth SET nama_pengguna = ?, email = ?, gambar = ?, username = ? WHERE username = ?",
        [name, email, gambar, newUsername, username]
      );

      res
        .status(200)
        .json({ message: "Profile updated successfully!", gambar });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Change password endpoint
router.put(
  "/change-password/:username",
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Kata sandi saat ini diperlukan."),
    body("newPassword")
      .notEmpty()
      .withMessage("Kata sandi baru diperlukan.")
      .isLength({ min: 6 })
      .withMessage("Kata sandi baru minimal 6 karakter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      // Periksa apakah kedua field kosong
      if (
        errorMessages.includes("Kata sandi saat ini diperlukan.") &&
        errorMessages.includes("Kata sandi baru diperlukan.")
      ) {
        return res.status(400).json({ error: "Ubah dulu yaa!" });
      }

      // Periksa apakah hanya field kata sandi baru yang kosong
      if (
        !errorMessages.includes("Kata sandi saat ini diperlukan.") &&
        errorMessages.includes("Kata sandi baru diperlukan.")
      ) {
        return res.status(400).json({ error: "Ubah dulu yaa!" });
      }

      // Periksa apakah kata sandi baru kurang dari 6 karakter
      if (errorMessages.includes("Kata sandi baru minimal 6 karakter.")) {
        return res
          .status(400)
          .json({ error: "Kata sandi baru minimal 6 karakter." });
      }

      return res.status(400).json({ errors: errorMessages });
    }

    const { currentPassword, newPassword } = req.body;
    const username = req.params.username;

    try {
      const [users] = await pool.query(
        "SELECT * FROM auth WHERE username = ?",
        [username]
      );
      if (users.length === 0) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
      }
      const user = users[0];

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Kata sandi saat ini salah." });
      }

      // Periksa apakah kata sandi baru sama dengan kata sandi saat ini
      const isNewPasswordSame = await bcrypt.compare(
        newPassword,
        user.password
      );
      if (isNewPasswordSame) {
        return res.status(400).json({ error: "Ubah dulu yaa!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const [result] = await pool.query(
        "UPDATE auth SET password = ? WHERE username = ?",
        [hashedPassword, username]
      );

      res.status(200).json({ message: "Password changed successfully!" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
