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
 return arr.slice(0, 20);
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

const addHandsCard = async (req, res) => {
 try {
  const params = req.body;
  console.log(params);
  let response = await api(params);
  res.status(200).json(response);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateHandsCard = async (req, res) => {
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

module.exports = {
 handArrP1,
 handArrP2,
 getHandsCard,
 addHandsCard,
 updateHandsCard,
};
