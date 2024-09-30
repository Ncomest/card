const Table = require("../models/table.model.js");

const getTableBoxes = async (req, res) => {
 try {
  const table = await Table.find({});
  res.status(200).json(table);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const getTableBox = async (req, res) => {
 try {
  const { id } = req.params;
  const table = await Table.findById(id);
  res.status(200).json(table);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const createTableBox = async (req, res) => {
 try {
  const cardOnTable = await Table.create(req.body);
  res.status(200).json(cardOnTable);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateTableBox = async (req, res) => {
 try {
  const { id } = req.params;
  const table = await Table.findByIdAndUpdate(id, req.body);
  if (!table) {
   return res.status(404).json({ message: "Table case not found" });
  }
  const updatedTable = await Table.findById(id);
  res.status(200).json(updatedTable);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const deleteTableBox = async (req, res) => {
 try {
  const { id } = req.params;
  const table = await Table.findByIdAndDelete(id);
  if (!table) res.status(404).json({ message: "Table case not found" });
  res.status(200).json({ message: "Deleted success" });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getTableBoxes,
 getTableBox,
 createTableBox,
 updateTableBox,
 deleteTableBox,
};
