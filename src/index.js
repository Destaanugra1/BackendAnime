require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express(); // ✅ Pindahkan deklarasi `app` ke sini

app.use(express.json());
app.use(cors());

// ✅ Pastikan route "/" ada setelah `app` dibuat
app.get("/", (req, res) => {
  res.send("Hallo");
});

// Import routes setelah `app` dibuat
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; // Wajib untuk Vercel
