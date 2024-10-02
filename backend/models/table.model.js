const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
 _id: { type: String },
 url: { type: String },
 name: { type: String },
});

const CardState = new mongoose.Schema({
 have_damaged: { type: Number },
 poison: { type: Number },
 blood: { type: Number },
 armor: { type: Number },
 stack: { type: Number },
 closed: { type: Boolean },
 step_over: { type: Boolean },
 step_skip: { type: Boolean },
});

const TableSchema = new mongoose.Schema({
 _id: { type: Number, required: true },
 isEmpty: { type: Boolean, required: true },
 card: { type: CardSchema },
 card_state: { type: CardState },
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
