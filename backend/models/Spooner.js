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

spoonerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

spoonerSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

spoonerSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = mongoose.model("User", spoonerSchema);
