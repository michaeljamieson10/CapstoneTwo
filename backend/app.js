/** Express app for Dreamsprawl(capstone2). */
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/avatar");
const adminRoutes = require("./routes/admin");
app.use("/api/users", userRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
module.exports = app;