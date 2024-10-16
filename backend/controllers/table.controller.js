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
      card_state: {
       have_damaged: null,
       poison: null,
       blood: null,
       armor: null,
       stack: null,
       closed: true,
       step_over: false,
       step_skip: false,
      },
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

  if (data.set_state == "setstate") {
   console.log(data, "setstate");
   const currCardState = data.currCardState;
   const value = data.value;

   const knowData = await Table.findById(id);
   if (knowData.card_state === null) {
    currData.card_state = {};
   }

   await Table.findByIdAndUpdate(id, {
    $set: { [`card_state.${currCardState}`]: value },
   });

   const currData = await Table.find({});
   return res.status(200).json(currData);
   //  const currData = await Table.findById(id);
   //  if (!currData) {
   //   return res.status(404).json({ message: "Case of table not found" });
   //  }

   //  if (currData.card_state === null || !currData.card_state) {
   //   console.log("card_state === null");
   //  } else if (currData.card_state !== null) {
   //   console.log("card_state !== null");

   //   const updateCaseTable = await Table.findByIdAndUpdate(
   //    id,
   //    {
   //     $set: { [`card_state.${currCardState}`]: value },
   //    },
   //    { new: true, runValidators: true }
   //   );
   //   console.log("updateCaseTable", updateCaseTable);
   //   const updatedCaseTable = await updateCaseTable.Table.find({});
   //   return res.status(200).json(updatedCaseTable);
   //  }

   //  if (currData.card_state !== null && currData.card_state) {
   //   console.log("state != null");

   //   const updateCaseTable = await Table.findByIdAndUpdate(
   //    id,
   //    {
   //     $set: {
   //      [`card_state.${currCardState}`]: value,
   //     },
   //    },
   //    { new: true, runValidators: true }
   //   );

   //   if (!updateCaseTable) {
   //    return res.status(404).json({ message: "Case of table not found" });
   //   }

   //   const updatedTable = await Table.find({});
   //   return res.status(200).json({ message: "success" });
   //  } else if (currData.card_state === null || !currData.card_state) {
   //   currData.card_state = {};

   //   currData.card_state[currCardState] = value;

   //   const updateCardState = await currData.save();
   //   res.status(200).json(updateCardState);
   //  }
   //  res.status(400).json({ message: "ошибка в data.set_state" });
  }

  if (data.tshirt === "tshirt") {
   if (data.userCardFront === data.user) {
    await Table.findByIdAndUpdate(id, {
     $set: { [`card_state.closed`]: Boolean(false) },
    },{new: true, runValidators: true});
    const updatedCard = await Table.findById(id);
    return res.status(200).json(updatedCard);
   }
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
