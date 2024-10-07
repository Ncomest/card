const Table = require("../models/table.model.js");
// const { arrTable } = require("../data/table/table.js");
// const { handArrP1, handArrP2 } = require("./hands.controller.js");

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
  const data = req.body;
  console.log("id", id, "data", data);

  if (data.placePickCard === "table") {
   if (data.placePutCard === "table") {
    const updateCaseTable = await Table.findByIdAndUpdate(
     id,
     {
      card: data.card,
      card_state: data.card_state,
      isEmpty: false,
      user: data.user,
     },
     { new: true, runValidators: true }
    );

    if (!updateCaseTable) {
     return res.status(404).json({ message: "Case of table not found" });
    }

    if (data.casePickTableId) {
     await Table.findByIdAndUpdate(
      data.casePickTableId,
      {
       card: null,
       card_state: null,
       isEmpty: true,
       user: null,
      },
      { new: true, runValidators: true }
     );
    }

    return res.status(200).json(updateCaseTable);
   }
  } else if (data.placePickCard === "hand") {
   if (data.placePutCard === "table") {
    console.log("сработал pick hand and put table");

    const updateCaseTable = await Table.findByIdAndUpdate(
     id,
     {
      card: data.card,
      isEmpty: false,
      user: data.user,
     },
     { new: true, runValidators: true }
    );

    // console.log("upd1", updateCaseTable);
    if (!updateCaseTable) {
     return res.status(404).json({ message: "Case of table not found" });
    }

    const updatedTable = await Table.find({});
    console.log(updatedTable, "upd2");
    return res(200).json(updatedTable);
   }
  }

  res.status(400).json({ message: "Invalid request" });
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
