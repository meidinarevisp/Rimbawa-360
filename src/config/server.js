const express = require("express");
const bodyParser = require("body-parser");
const direktoriRoutes = require("../config/routes/direktori");
const edukasiRoutes = require("../config/routes/edukasi");
const spesiesRoutes = require("../config/routes/spesies");
const authRoutes = require("../config/routes/auth");
const ceritaRoutes = require("../config/routes/cerita");
const forumRoutes = require("../config/routes/forum");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "src", "public", "uploads"))
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/direktori", direktoriRoutes);
app.use("/api/edukasi", edukasiRoutes);
app.use("/api/spesies", spesiesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cerita", ceritaRoutes);
app.use("/api/forum", forumRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
