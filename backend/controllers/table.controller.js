const Table = require("../models/table.model.js");
// const { arrTable } = require("../data/table/table.js");

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
  const updatedData = req.body;
  


  console.log('id',id,"updateDate", updatedData);
  // const updatedTable = await Table.findByIdAndUpdate(
  //  targetId,
  //  { card, card_state, isEmpty: false },
  //  {
  //   new: true,
  //   runValidators: true,
  //  }
  // );

  // if (!updatedTable) {
  //  return res.status(404).json({ message: "Table case not found" });
  // }

  // if (sourceId) {
  //  await Table.findByIdAndUpdate(
  //   sourceId,
  //   { card: null, card_state: null, isEmpty: true },
  //   {
  //    new: true,
  //    runValidators: true,
  //   }
  //  );
  // }

  res.status(200).json('succes');
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
