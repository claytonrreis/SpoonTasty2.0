// const express = require("express");
// const Spooner = require("../models/Spooner");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const auth = require("../auth");

// router.use(auth);

// // Register
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, spoonerName, email, password } = req.body;
// //     const spooner = new Spooner({ name, spoonerName, email, password });
// //     await spooner.save();
// //     res.status(201).json({ message: "Spooner registered successfully" });
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });
// router.post("/register", async (req, res) => {
//   try {
//     const { name, spoonerName, email, password } = req.body;

//     // Validate input
//     if (!name || !spoonerName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       name,
//       spoonerName,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

// // Login
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { spoonerName, password } = req.body;
// //     const spooner = await Spooner.findOne({ spoonerName });
// //     if (!spooner || !(await spooner.matchPassword(password))) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }
// //     const token = spooner.generateToken();
// //     res.json({ token });
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // router.post("/login", async (req, res) => {
// //   try {
// //     const { spoonerName, password } = req.body;
// //     const spooner = await Spooner.findOne({ spoonerName });
// //     if (!spooner) {
// //       return res
// //         .status(400)
// //         .json({ message: "Invalid spooner name or password" });
// //     }

// //     const isMatch = await bcrypt.compare(password, spooner.password);
// //     if (!isMatch) {
// //       return res
// //         .status(400)
// //         .json({ message: "Invalid spooner name or password" });
// //     }

// //     const token = jwt.sign({ id: spooner._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });

// //     // Set the token as an HTTP-only cookie
// //     res.cookie("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
// //       maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour here)
// //     });

// //     res.status(200).json({ message: "Login successful" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // router.post("/login", async (req, res) => {
// //   try {
// //     const { spoonerName, password } = req.body;
// //     // Validate user and generate token
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// //     res.cookie("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //     }); // Set cookie
// //     res.status(200).json({ message: "Logged in successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "An error occurred" });
// //   }
// // });

// router.post("/login", async (req, res) => {
//   try {
//     const { spoonerName, password } = req.body;
//     // Authenticate user here
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true, // Ensure the cookie is only accessible by the web server
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       sameSite: "Strict", // Prevent CSRF attacks
//     });

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

// //logout
// router.post("/logout", (req, res) => {
//   console.log("Logout request received"); // Debugging log
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Logout error:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Profile Update
// // router.put("/profile", async (req, res) => {
// //   try {
// //     const { token, email, newPassword } = req.body;
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const spooner = await Spooner.findById(decoded.id);

// //     if (newPassword) {
// //       spooner.password = newPassword;
// //       await spooner.save();
// //     }

// //     if (email) {
// //       spooner.email = email;
// //       await spooner.save();
// //     }

// //     res.json({ message: "Profile updated successfully" });
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });
// router.put("/profile", async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id; // Extract user ID from the authenticated request
//     const { name, email, newPassword } = req.body;

//     // Find and update the user
//     const spooner = await Spooner.findById(userId);
//     if (!spooner) return res.status(404).json({ message: "Spooner not found" });

//     spooner.name = name || spooner.name;
//     spooner.email = email || spooner.email;
//     if (newPassword) {
//       spooner.password = await bcrypt.hash(newPassword, 10); // Hash the new password
//     }

//     await spooner.save();
//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //delete acoount

// router.delete("/delete-account", async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id; // Extract user ID from the authenticated request
//     await User.findByIdAndDelete(spoonerId);
//     res.clearCookie("token"); // Clear the authentication cookie
//     res.status(200).json({ message: "Account deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Spooner = require("../models/Spooner");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

// Public route - No authentication required
router.post("/register", async (req, res) => {
  try {
    const { name, spoonerName, email, password } = req.body;

    // Validate input
    if (!name || !spoonerName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await Spooner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Spooner({
      name,
      spoonerName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred" });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { spoonerName, password } = req.body;

//     // Debugging: Log incoming data
//     console.log("Login attempt:", { spoonerName, password });

//     const spooner = await Spooner.findOne({ spoonerName });
//     if (!spooner) {
//       console.log("User not found");
//       return res
//         .status(400)
//         .json({ message: "Invalid spooner name or password" });
//     }

//     console.log("Stored hashed password:", spooner.password);

//     const isMatch = await spooner.matchPassword(password);
//     console.log("Password match result:", isMatch);

//     if (!isMatch) {
//       console.log("Password mismatch");
//       return res
//         .status(400)
//         .json({ message: "Invalid spooner name or password" });
//     }

//     const token = spooner.generateToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Strict",
//     });

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { spoonerName, password } = req.body;

    console.log("Login attempt:", { spoonerName, password }); // Debugging

    // Find user by spoonerName
    const spooner = await Spooner.findOne({ spoonerName });
    if (!spooner) {
      console.log("User not found");
      return res
        .status(400)
        .json({ message: "Invalid spooner name or password" });
    }

    // Log the stored password for debugging
    console.log("Stored password:", spooner.password);

    // Compare provided password with stored password (assuming plain text)
    const isMatch = await spooner.matchPassword(password);
    console.log("Password match result:", isMatch); // Debugging
    if (!isMatch) {
      console.log("Password mismatch");
      return res
        .status(400)
        .json({ message: "Invalid spooner name or password" });
    }

    // Generate and send token
    const token = spooner.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Middleware to protect the following routes
router.use(auth);

//get Spooner profile**
// router.get("/profile", async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id;
//     const spooner = await Spooner.findById(spoonerId);
//     if (!spooner) return res.status(404).json({ message: "Spooner not found" });

//     res.status(200).json(spooner);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });
router.get("/profile", auth, async (req, res) => {
  try {
    const spoonerId = req.spooner.id; // Extract user ID from the authenticated request
    const spooner = await Spooner.findById(spoonerId).select("-password"); // Exclude the password field

    if (!spooner) {
      return res.status(404).json({ message: "Spooner not found" });
    }

    res.status(200).json(spooner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//update spooner profiles
router.put("/profile", async (req, res) => {
  try {
    const spoonerId = req.spooner.id;
    const { name, email, newPassword } = req.body;

    // Find and update the user
    const spooner = await Spooner.findById(spoonerId);
    if (!spooner) return res.status(404).json({ message: "Spooner not found" });

    spooner.name = name || spooner.name;
    spooner.email = email || spooner.email;
    if (newPassword) {
      spooner.password = await bcrypt.hash(newPassword, 10);
    }

    await spooner.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is true in production
      sameSite: "None", // Adjust as needed
      domain: ".example.com", // Adjust to your domain
      path: "/", // Ensure this path matches
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Delete Account
router.delete("/delete-account", async (req, res) => {
  try {
    const spoonerId = req.spooner.id; // Extract user ID from the authenticated request
    await Spooner.findByIdAndDelete(spoonerId);
    res.clearCookie("token"); // Clear the authentication cookie
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
