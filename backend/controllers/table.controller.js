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
  const data = req.body;
  console.log(data);
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

    const updatedTable = await Table.find({});
    return res.status(200).json(updatedTable);
   } else if (data.placePutCard === "hand") {
    const updateCaseTable = await Table.findByIdAndUpdate(
     data.casePickTableId,
     {
      card: null,
      card_state: null,
      isEmpty: true,
      user: null,
     },
     { new: true, runValidators: true }
    );

    if (!updateCaseTable) {
     return res.status(400).json({ message: error.message });
    }
    const updatedTable = await Table.find({});
    return res.status(200).json(updatedTable);
   }
  } else if (data.placePickCard === "hand") {
   if (data.placePutCard === "table") {
    const updateCaseTable = await Table.findByIdAndUpdate(
     id,
     {
      card: data.card,
      isEmpty: false,
      user: data.user,
     },
     { new: true, runValidators: true }
    );

    if (!updateCaseTable) {
     return res.status(404).json({ message: "Case of table not found" });
    }

    const updatedTable = await Table.find({});
    return res.status(200).json(updatedTable);
   }
  }

  if (data.set_state === "setstate" && data) {
   const currCardState = data.currCardState;
   const value = data.value;

   const updateCaseTable = await Table.findByIdAndUpdate(id, {
    $set: {
     [`card_state.${currCardState}`]: value,
    },
   });

   if (!updateCaseTable) {
    return res.status(404).json({ message: "Case of table not found" });
   }

   //  const updatedTable = await Table.find({});
   return res.status(200).json({ message: "success" });
  }

  res.status(400).json({ message: "Invalid request" });
 } catch (error) {
  res.status(500).json({ message: `проверка ошибка ${error.message}` });
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
