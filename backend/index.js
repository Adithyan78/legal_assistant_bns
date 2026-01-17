const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 4000;

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(cors());

/* ===== CONFIG ===== */
const MONGO_URI = "";
const JWT_SECRET = "super_secret_legal_ai_key";

/* ===== DB CONNECT ===== */
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

/* ===== USER MODEL ===== */
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "legal_user" },
  createdAt: { type: Date, default: Date.now }
});

/* ===== AUTH MIDDLEWARE ===== */
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

/* ===== ROUTES ===== */

// Health check
app.get("/", (req, res) => {
  res.send("AI Legal Backend Running");
});

// SIGNUP
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  const token = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// GET LOGGED-IN USER
app.get("/auth/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

/* ===== START SERVER ===== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
