// const express = require("express");
// const Spooner = require("../models/Spooner");
// const router = express.Router();
// const GroceryList = require("../models/GroceryList");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const auth = require("../auth");

// // create a new Spooner
// router.post("/register", async (req, res) => {
//   try {
//     const { name, spoonerName, email, password } = req.body;

//     if (!name || !spoonerName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the user already exists
//     const existingUser = await Spooner.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new Spooner({
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

// router.post("/login", async (req, res) => {
//   try {
//     const { spoonerName, password } = req.body;

//     // console.log("Login attempt:", { spoonerName, password }); // Debugging

//     // Find user by spoonerName
//     const spooner = await Spooner.findOne({ spoonerName });
//     if (!spooner) {
//       console.log("User not found");
//       return res
//         .status(400)
//         .json({ message: "Invalid spooner name or password" });
//     }

//     // Log the stored password for debugging
//     console.log("Stored password:", spooner.password);

//     // Compare provided password with stored password (assuming plain text)
//     const isMatch = await spooner.matchPassword(password);
//     // console.log("Password match result:", isMatch); // Debugging
//     if (!isMatch) {
//       console.log("Password mismatch");
//       return res
//         .status(400)
//         .json({ message: "Invalid spooner name or password" });
//     }

//     // Generate and send token
//     const token = spooner.generateToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Strict",
//     });
//     console.log(token);

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

// // Middleware to protect the following routes
// router.use(auth);

// router.get("/profile", auth, async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id;
//     const spooner = await Spooner.findById(spoonerId).select("-password");

//     if (!spooner) {
//       return res.status(404).json({ message: "Spooner not found" });
//     }

//     res.status(200).json(spooner);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

// //update spooner profiles
// router.put("/profile", async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id;
//     const { name, email, newPassword } = req.body;

//     // Findd and update the Spooner
//     const spooner = await Spooner.findById(spoonerId);
//     if (!spooner) return res.status(404).json({ message: "Spooner not found" });

//     spooner.name = name || spooner.name;
//     spooner.email = email || spooner.email;
//     if (newPassword) {
//       spooner.password = await bcrypt.hash(newPassword, 10);
//     }

//     await spooner.save();
//     res.status(200).json({ message: "Profile updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// });

// router.post("/logout", (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "None",
//       domain: ".example.com",
//       path: "/",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

// // Delete Account
// router.delete("/delete-account", async (req, res) => {
//   try {
//     const spoonerId = req.spooner.id;
//     await Spooner.findByIdAndDelete(spoonerId);
//     res.clearCookie("token");
//     res.status(200).json({ message: "Account deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// //create grocery List
// router.post("/grocery-lists/create", auth, async (req, res) => {
//   try {
//     const { listName, items } = req.body;
//     const spoonerId = req.spooner.id;
//     const newGroceryList = new GroceryList({
//       listName,
//       items,
//     });
//     await newGroceryList.save();

//     // Find the spooner and add to groceryLists array
//     const spooner = await Spooner.findById(spoonerId);
//     if (!spooner) {
//       return res.status(404).json({ message: "Spooner not found" });
//     }

//     // Add GList the spooner groceryLists []
//     spooner.groceryLists.push(newGroceryList._id);
//     await spooner.save();

//     res.status(201).json({
//       message: "Grocery list created successfully",
//       newGroceryList,
//     });
//   } catch (error) {
//     console.error("Error creating grocery list:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while creating the grocery list" });
//   }
// });

// router.get("/grocery-lists", auth, async (req, res) => {
//   try {
//     const spooner = await Spooner.findById(req.spooner.id).populate(
//       "groceryLists"
//     );
//     if (!spooner) {
//       return res.status(404).json({ message: "Spooner not found" });
//     }
//     res.json(spooner.groceryLists);
//   } catch (error) {
//     console.error("Error fetching grocery lists:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while fetching grocery lists" });
//   }
// });

// router.put("/grocery-lists/:id", async (req, res) => {
//   try {
//     const { listName, items } = req.body;
//     const { id } = req.params;

//     // Find the list by ID and update
//     const groceryList = await GroceryList.findByIdAndUpdate(
//       id,
//       { listName, items },
//       { new: true }
//     );

//     if (!groceryList) {
//       return res.status(404).json({ message: "Grocery list not found" });
//     }

//     res.status(200).json(groceryList);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/grocery-lists/:id", async (req, res) => {
//   try {
//     const listId = req.params.id;
//     const result = await GroceryList.findByIdAndDelete(listId);

//     if (!result) {
//       return res.status(404).json({ message: "Grocery list not found" });
//     }

//     res.status(200).json({ message: "Grocery list deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const Spooner = require("../models/Spooner");
const router = express.Router();
const GroceryList = require("../models/GroceryList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

// create a new Spooner
router.post("/register", async (req, res) => {
  try {
    const { name, spoonerName, email, password } = req.body;

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

router.post("/login", async (req, res) => {
  try {
    const { spoonerName, password } = req.body;

    // console.log("Login attempt:", { spoonerName, password }); // Debugging

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
    // console.log("Password match result:", isMatch); // Debugging
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
    console.log(token);

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      domain: ".example.com",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Middleware to protect the following routes
router.use(auth);

router.get("/profile", async (req, res) => {
  try {
    const spoonerId = req.spooner.id;
    const spooner = await Spooner.findById(spoonerId).select("-password");

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

    // Findd and update the Spooner
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

// Delete Account
router.delete("/delete-account", async (req, res) => {
  try {
    const spoonerId = req.spooner.id;
    await Spooner.findByIdAndDelete(spoonerId);
    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//create grocery List
router.post("/grocery-lists/create", async (req, res) => {
  try {
    const { listName, items } = req.body;
    const spoonerId = req.spooner.id;
    const newGroceryList = new GroceryList({
      listName,
      items,
    });
    await newGroceryList.save();

    // Find the spooner and add to groceryLists array
    const spooner = await Spooner.findById(spoonerId);
    if (!spooner) {
      return res.status(404).json({ message: "Spooner not found" });
    }

    // Add GList the spooner groceryLists []
    spooner.groceryLists.push(newGroceryList._id);
    await spooner.save();

    res.status(201).json({
      message: "Grocery list created successfully",
      newGroceryList,
    });
  } catch (error) {
    console.error("Error creating grocery list:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the grocery list" });
  }
});

router.get("/grocery-lists", async (req, res) => {
  try {
    const spooner = await Spooner.findById(req.spooner.id).populate(
      "groceryLists"
    );
    if (!spooner) {
      return res.status(404).json({ message: "Spooner not found" });
    }
    res.json(spooner.groceryLists);
  } catch (error) {
    console.error("Error fetching grocery lists:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching grocery lists" });
  }
});

router.put("/grocery-lists/:id", async (req, res) => {
  try {
    const { listName, items } = req.body;
    const { id } = req.params;

    // Find the list by ID and update
    const groceryList = await GroceryList.findByIdAndUpdate(
      id,
      { listName, items },
      { new: true }
    );

    if (!groceryList) {
      return res.status(404).json({ message: "Grocery list not found" });
    }

    res.status(200).json(groceryList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/grocery-lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;
    const result = await GroceryList.findByIdAndDelete(listId);

    if (!result) {
      return res.status(404).json({ message: "Grocery list not found" });
    }

    res.status(200).json({ message: "Grocery list deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
