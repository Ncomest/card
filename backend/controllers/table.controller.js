const Table = require("../models/table.model.js");

const clients = [];

const longPullingUpdate = (req, res) => {
 clients.push(res);
 console.log(clients.length);
 req.on("close", () => clients.splice(clients.indexOf(res), 1));
};

const notifyClients = (data) => {
 setTimeout(() => {
  clients.forEach((client) => client.status(200).json(data));
  clients.length = 0;
 }, 1000);
};

const getTableBoxes = async (req, res) => {
 try {
  const table = await Table.find({});
  res.status(200).json(table);
  // notifyClients();
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
 console.log("upd work");
 try {
  const { id } = req.params;
  const data = req.body;

  if (data.placePickCard === "table") {
   if (data.placePutCard === "table") {
    console.log("table-table");
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
    notifyClients(updatedTable);
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
    notifyClients(updatedTable);
    return res.status(200).json(updatedTable);
    // return notifyClients();
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
       fire: null,
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
    notifyClients(updatedTable);
    return res.status(200).json(updatedTable);
    // return notifyClients();
   }
  }

  //======установить-состояние-для-карты======>//
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
   notifyClients(currData);
   return res.status(200).json(currData);
   //  return notifyClients();
  }
  //>======установить-состояние-для-карты======//

  //======перевернуть-рубашку======>//
  if (data.tshirt === "tshirt") {
   if (data.userCardFront === data.user) {
    await Table.findByIdAndUpdate(
     id,
     {
      $set: { [`card_state.closed`]: Boolean(false) },
     },
     { new: true, runValidators: true }
    );
    const updatedCard = await Table.findById(id);
    const updTable = await Table.find({});
    notifyClients(updTable);
    return res.status(200).json(updatedCard);
   }
  }
  //>======перевернуть-рубашку======//

  //======конец-хода======>//
  if (data.stepOver === "stepover") {
   await Table.findByIdAndUpdate(
    id,
    {
     $set: { [`card_state.step_over`]: Boolean(true) },
    },
    { new: true, runValidators: true }
   );
   const updatedCard = await Table.findById(id);
   const updTable = await Table.find({});
   notifyClients(updTable);
   return res.status(200).json(updatedCard);
  }
  //>======конец-хода======//

  res.status(400).json({ message: "Invalid request" });
 } catch (error) {
  res.status(500).json({ message: `проверка ошибка ${error.message}` });
 }
};

// set step over = false
const updateAllTableBox = async (req, res) => {
 try {
  const data = req.body;
  const tableData = await Table.find({});
  const tableDataObject = tableData.map((doc) => doc.toObject());

  const updatedTableData = await tableDataObject.map((card) => {
   if (card.user === data.user) {
    return {
     ...card,
     card_state: {
      ...card.card_state,
      step_over: false,
     },
    };
   }

   return card;
  });

  await Promise.all(
   updatedTableData.map((card) => Table.updateOne({ _id: card._id }, card))
  );

  const updTable = await Table.find({})
  notifyClients(updTable)
  res.status(200).json(updatedTableData);
 } catch (error) {
  res.status(500).json({ message: `invalid request ${error.message}` });
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
 updateAllTableBox,
 deleteTableBox,
 longPullingUpdate,
};
