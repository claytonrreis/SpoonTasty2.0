// // const express = require("express");
// // const router = express.Router();
// // const Spooner = require("../models/Spooner");
// // const GroceryList = require("../models/GroceryList");
// // const auth = require("../auth");

// // // Route to fetch the user's grocery list
// // // router.get("/:id/grocery-lists", async (req, res) => {
// // //   try {
// // //     const spoonerId = req.params.id;

// // //     // Find the spooner by ID and populate groceryLists
// // //     const spooner = await Spooner.findById(spoonerId).populate("groceryLists");
// // //     console.log(spooner);

// // //     if (!spooner) {
// // //       return res.status(404).json({ message: "Spooner not found" });
// // //     }

// // //     res.status(200).json(spooner.groceryLists);
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ message: "An error occurred" });
// // //   }
// // // });

// // // Route to add a new grocery item
// // // Create a new grocery list and associate it with a spooner
// // router.post("/:id", [auth], async (req, res) => {
// //   try {
// //     const grocery = await GroceryList.findOne({ spooner: req.spooner.id });
// //     const { listName, items, spoonerId } = req.body;
// //     console.log(grocery);

// //     // Create a new grocery list
// //     const newGroceryList = new GroceryList({
// //       listName,
// //       items,
// //     });

// //     await newGroceryList.save();

// //     // Find the spooner and add the new grocery list to the spooner's groceryLists
// //     await Spooner.findByIdAndUpdate(spoonerId, {
// //       $push: { groceryLists: newGroceryList._id },
// //     });

// //     res.status(201).json(newGroceryList);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "An error occurred" });
// //   }
// // });

// // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const auth = require("../auth");
// // const Spooner = require("../models/Spooner");
// // const GroceryList = require("../models/GroceryList");

// // // Create a new grocery list and add it to the logged-in user's groceryLists array
// // router.post("/create", auth, async (req, res) => {
// //   const { listName, items } = req.body;
// //   const spoonerId = req.spooner._id;

// //   try {
// //     // Create the new grocery list
// //     const newGroceryList = new GroceryList({
// //       listName,
// //       items,
// //     });

// //     // Save the grocery list to the database
// //     await newGroceryList.save();

// //     // Add the new grocery list's ID to the spooner's groceryLists array
// //     const spooner = await Spooner.findById(spoonerId);
// //     spooner.groceryLists.push(newGroceryList._id);
// //     await spooner.save();

// //     res.status(201).json(newGroceryList);
// //   } catch (error) {
// //     console.error(error);
// //     res
// //       .status(500)
// //       .json({ message: "An error occurred while creating the grocery list" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const auth = require("../auth"); // Adjust path if necessary
// const GroceryList = require("../models/GroceryList");
// const Spooner = require("../models/Spooner");

// // Middleware to authenticate
// router.use(auth);

// // router.put("/:id", async (req, res) => {
// //   try {
// //     const { listName, items } = req.body;
// //     const { id } = req.params;

// //     // Find the list by ID and update
// //     const groceryList = await GroceryList.findByIdAndUpdate(
// //       id,
// //       { listName, items },
// //       { new: true }
// //     );

// //     if (!groceryList) {
// //       return res.status(404).json({ message: "Grocery list not found" });
// //     }

// //     // Optionally update Spooner if needed
// //     // const spooner = await Spooner.findOne({ "groceryLists": id });
// //     // if (spooner) {
// //     //   spooner.groceryLists = spooner.groceryLists.map((list) =>
// //     //     list.toString() === id ? groceryList._id : list
// //     //   );
// //     //   await spooner.save();
// //     // }

// //     res.status(200).json(groceryList);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// module.exports = router;
