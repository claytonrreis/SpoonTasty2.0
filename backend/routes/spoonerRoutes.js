const express = require("express");
const Spooner = require("../models/Spooner");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, spoonerName, email, password } = req.body;
    const spooner = new Spooner({ name, spoonerName, email, password });
    await spooner.save();
    res.status(201).json({ message: "Spooner registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
// router.post("/login", async (req, res) => {
//   try {
//     const { spoonerName, password } = req.body;
//     const spooner = await Spooner.findOne({ spoonerName });
//     if (!spooner || !(await spooner.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = spooner.generateToken();
//     res.json({ token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { spoonerName, password } = req.body;
    const spooner = await Spooner.findOne({ spoonerName });
    if (!spooner) {
      return res
        .status(400)
        .json({ message: "Invalid spooner name or password" });
    }

    const isMatch = await bcrypt.compare(password, spooner.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid spooner name or password" });
    }

    const token = jwt.sign({ id: spooner._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour here)
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//logout
router.post("/logout", (req, res) => {
  console.log("Logout request received"); // Debugging log
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Profile Update
router.put("/profile", async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const spooner = await Spooner.findById(decoded.id);

    if (newPassword) {
      spooner.password = newPassword;
      await spooner.save();
    }

    if (email) {
      spooner.email = email;
      await spooner.save();
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
