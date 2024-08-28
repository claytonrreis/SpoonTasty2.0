// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const GroceryList = require("./GroceryList");

// const spoonerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   spoonerName: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   groceryLists: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "GroceryList",
//     },
//   ],
// });

// // Method to check password
// spoonerSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Method to generate a JWT token
// spoonerSchema.methods.generateToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
// };

// module.exports = mongoose.model("Spooner", spoonerSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GroceryList = require("./GroceryList");

const spoonerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  spoonerName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groceryLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroceryList",
    },
  ],
});

// Method to check password
spoonerSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
spoonerSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = mongoose.model("Spooner", spoonerSchema);
