/** Express app for Dreamsprawl(capstone2). */
const express = require("express");
const app = express();
// const router = new express.Router();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/avatar");
app.use("/api/users", userRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api/auth", authRoutes);
// const PORT = +process.env.PORT || 3001;
module.exports = app;