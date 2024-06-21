const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const gambar = path.join(__dirname, "../../public/images/user.png");

const USER_ROLE = 2;
const ADMIN_ROLE = 1;

const SECRET_KEY = "capstone";

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
      const [userExists] = await pool.query(
        "SELECT id_user FROM auth WHERE email = ? OR username = ?",
        [email, username]
      );
      if (userExists.length > 0) {
        return res
          .status(400)
          .json({ error: "Email atau Nama pengguna sudah terdaftar." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      let gambar = "/images/user.png";
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
      const [users] = await pool.query(
        "SELECT * FROM auth WHERE email = ? OR username = ?",
        [login, login]
      );

      if (users.length === 0) {
        return res.status(401).json({ error: "Pengguna tidak ditemukan." });
      }

      const user = users[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Kata sandi salah." });
      }

      const token = jwt.sign(
        { id: user.id_user, username: user.username, gambar: user.gambar },
        SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );

      let redirectUrl;
      if (user.role_id === ADMIN_ROLE) {
        redirectUrl = "/#/dashboard-admin";
      } else if (user.role_id === USER_ROLE) {
        redirectUrl = "/#/beranda";
      } else {
        return res.status(403).json({ error: "Role pengguna tidak valid." });
      }

      res.status(200).json({
        message: "Login berhasil!",
        user: {
          id_user: user.id_user,
          name: user.nama_pengguna,
          email: user.email,
          username: user.username,
          role_id: user.role_id,
          gambar: user.gambar,
        },
        redirectUrl,
        token,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

module.exports = verifyToken;

router.put(
  "/update-profile/:username",
  verifyToken,
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

        await pool.query("UPDATE cerita SET gambar = ? WHERE id_user = ?", [
          gambar,
          user.id_user,
        ]);

        await pool.query("UPDATE forum SET gambar = ? WHERE id_user = ?", [
          gambar,
          user.id_user,
        ]);
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

router.put(
  "/change-password/:username",
  verifyToken,
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

      if (
        errorMessages.includes("Kata sandi saat ini diperlukan.") &&
        errorMessages.includes("Kata sandi baru diperlukan.")
      ) {
        return res.status(400).json({ error: "Ubah dulu yaa!" });
      }

      if (
        !errorMessages.includes("Kata sandi saat ini diperlukan.") &&
        errorMessages.includes("Kata sandi baru diperlukan.")
      ) {
        return res.status(400).json({ error: "Password baru diperlukan!" });
      }

      if (
        errorMessages.includes("Kata sandi saat ini diperlukan.") &&
        !errorMessages.includes("Kata sandi baru diperlukan.")
      ) {
        return res.status(400).json({ error: "Password saat ini diperlukan!" });
      }

      return res.status(400).json({ error: "Password minimal 6 karakter!" });
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
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(401).json({ error: "Password saat ini salah!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query("UPDATE auth SET password = ? WHERE username = ?", [
        hashedPassword,
        username,
      ]);

      res.status(200).json({ message: "Password changed successfully!" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Email tidak valid.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const [users] = await pool.query("SELECT * FROM auth WHERE email = ?", [
        email,
      ]);

      if (users.length === 0) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
      }

      const user = users[0];
      const token = crypto.randomBytes(20).toString("hex");

      const expirationTime = Date.now() + 3600000;
      await pool.query(
        "UPDATE auth SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?",
        [token, expirationTime, email]
      );

      const resetUrl = `${process.env.BASE_URL}/#/reset-password/${token}`;

      const mailOptions = {
        to: email,
        from: `Rimbawa 360 <${process.env.EMAIL_USERNAME}>`,
        subject: "Reset Kata Sandi",
        html: `
        <p style="color: #000;">Anda menerima email ini karena Anda (atau orang lain) telah meminta untuk mereset kata sandi akun Anda.</p>
        <p style="color: #000;">Silakan klik tombol di bawah ini atau salin dan tempel URL ke browser Anda untuk menyelesaikan prosesnya dalam waktu satu jam setelah menerimanya:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 8px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Reset Kata Sandi</a>
        <p style="color: #ff0000;">Jika Anda tidak meminta ini, silakan abaikan email ini dan kata sandi Anda akan tetap tidak berubah.</p>
      `,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error("Error sending the email:", err);
          return res.status(500).json({ error: "Error sending the email." });
        }
        res.status(200).json({
          message: "Email berhasil dikirim. Silakan periksa email Kamu!",
        });
      });
    } catch (error) {
      console.error("Error during forgot password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/reset-password/:token",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Kata sandi minimal 6 karakter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.params;
    const { password } = req.body;

    try {
      const [users] = await pool.query(
        "SELECT * FROM auth WHERE reset_password_token = ? AND reset_password_expires > ?",
        [token, Date.now()]
      );

      if (users.length === 0) {
        return res.status(400).json({ error: "Token invalid or has expired." });
      }

      const user = users[0];
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "UPDATE auth SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id_user = ?",
        [hashedPassword, user.id_user]
      );

      res.status(200).json({ message: "Kata sandi berhasil diubah." });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
