const mongoose = require("mongoose");

const OrcSchema = mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
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

const Orc = mongoose.model("Orc", OrcSchema);

module.exports = Orc;
