const mongoose = require("mongoose");

const HumanSchema = mongoose.Schema(
 {
  name: {
   type: String,
   required: [true, "Please enter product name"],
  },
  url: {
   type: String,
   required: true,
  },
 },
 {
  timestamps: true,
 }
);

const Human = mongoose.model("Human", HumanSchema);

module.exports = Human;
