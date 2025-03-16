require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
