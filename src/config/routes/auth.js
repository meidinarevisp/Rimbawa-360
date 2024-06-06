// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const path = require("path");

// Role constants
const USER_ROLE = 2;
const ADMIN_ROLE = 1;

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
        "SELECT id FROM auth WHERE email = ? OR username = ?",
        [email, username]
      );
      if (userExists.length > 0) {
        return res
          .status(400)
          .json({ error: "Email atau Nama pengguna sudah terdaftar." });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Set the temporary image path
      const gambar = path.join(__dirname, "../../public/images/user.png");
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
          id: user.id,
          name: user.nama_pengguna,
          email: user.email,
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

router.get("/current-user", async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to get the user ID from the request
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const [users] = await pool.query("SELECT * FROM auth WHERE id = ?", [
      userId,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    res.status(200).json({
      id: user.id,
      name: user.nama_pengguna,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      gambar: user.gambar,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user profile endpoint
router.put(
  "/update-profile",
  [
    body("name").notEmpty().withMessage("Nama lengkap diperlukan."),
    body("username").notEmpty().withMessage("Nama pengguna diperlukan."),
    body("email").isEmail().withMessage("Email tidak valid."),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Kata sandi minimal 6 karakter."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body;
    const userId = req.userId; // Assuming you have middleware to get the user ID from the request

    try {
      // Check if email or username already exists for another user
      const [userExists] = await pool.query(
        "SELECT id FROM auth WHERE (email = ? OR username = ?) AND id != ?",
        [email, username, userId]
      );
      if (userExists.length > 0) {
        return res
          .status(400)
          .json({ error: "Email atau Nama pengguna sudah terdaftar." });
      }

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Handle image upload
      let imagePathToUpdate = null;
      if (req.files && req.files.image) {
        const image = req.files.image;
        const imagePath = path.join(
          __dirname,
          "../public/images/",
          `${userId}_${image.name}`
        );
        await image.mv(imagePath);
        imagePathToUpdate = imagePath;
      }

      // Update user data in the database
      const [result] = await pool.query(
        "UPDATE auth SET nama_pengguna = ?, email = ?, username = ?, password = COALESCE(?, password), gambar = COALESCE(?, gambar) WHERE id = ?",
        [name, email, username, hashedPassword, imagePathToUpdate, userId]
      );

      res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
