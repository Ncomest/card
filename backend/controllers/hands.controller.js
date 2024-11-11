const { default: axios } = require("axios");

let handArrP1 = [];
let handArrP2 = [];

const getHandsCard = async (req, res) => {
 try {
  const request = req.body;
  if (request.user === "player1") {
   return res.status(200).json(handArrP1);
  } else if (request.user === "player2") {
   return res.status(200).json(handArrP2);
  }
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const randomCard = (arr) => {
 arr = arr.sort(() => Math.random() - 0.5);
 return arr.slice(0, 16);
};

//helper for addHandsCard
async function api(args) {
 try {
  let res;
  if (args.user === "player1") {
   res = await axios.get(`http://localhost:4000/api/${args.deck}`);
   handArrP1 = [];
   handArrP1.push(...randomCard(res.data));
   return handArrP1;
  } else if (args.user === "player2") {
   res = await axios.get(`http://localhost:4000/api/${args.deck}`);
   handArrP2 = [];
   handArrP2.push(...randomCard(res.data));
   return handArrP2;
  } else {
   throw new Error("Undefined user");
  }
 } catch (error) {
  throw new Error("Datas error: " + error.message);
 }
}

const randomHandsCard = async (req, res) => {
 try {
  const params = req.body;
  let response = await api(params);
  res.status(200).json(response);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateHandsCard = async (req, res) => {
 try {
  const data = req.body;
  if (data.user === "player1") {
   handArrP1.unshift(data.card);
   return res.status(200).json(handArrP1);
  } else if (data.user === "player2") {
   handArrP2.unshift(data.card);
   return res.status(200).json(handArrP2);
  }
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const refreshHandsCard = async (req, res) => {
 try {
  const user = req.body.user;
  if (user === "player1") {
   handArrP1 = [];
   return res.status(200).json(handArrP1);
  } else if (user === "player2") {
   handArrP2 = [];
   return res.status(200).json(handArrP2);
  }
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const filterHandsCard = async (req, res) => {
 try {
  const data = req.body;
  console.log("данные которые получил сервер data", data);
  if (data.user === "player1") {
   handArrP1 = handArrP1.filter((_, index) => index !== Number(data.cardIndex));
   return res.status(200).json(handArrP1);
  } else if (data.user === "player2") {
    handArrP2 = handArrP2.filter((_, index) => index !== Number(data.cardIndex));
   return res.status(200).json(handArrP2);
  }
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 handArrP1,
 handArrP2,
 getHandsCard,
 randomHandsCard,
 //  addHandsCard,
 updateHandsCard,
 refreshHandsCard,
 filterHandsCard,
};
