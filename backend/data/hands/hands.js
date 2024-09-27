const express = require("express");
const app = express();
const Orc = require("../../models/orc.model.js");
const { default: axios } = require("axios");

let handArrP1 = [];
let handArrP2 = [];

const isSelectDeckP1 = false;
const isSelectDeckP2 = false;

const getHandsCard = async (req, res) => {
 const deck = await Orc.find({});
 try {
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

async function api(args) {
 try {
  let res;
  if (args.user === "player1") {
   res = await axios.get(`http://localhost:4000/api/${args.deck}`);
   handArrP1 = [];
   handArrP1.push(res.data);
   return handArrP1;
  } else if (args.user === "player2") {
   res = await axios.get(`http://localhost:4000/api/${args.deck}`);
   handArrP2 = [];
   handArrP2.push(res.data);
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
  let response = await api(params);
  res.status(200).json(response);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 handArrP1,
 handArrP2,
 getHandsCard,
 addHandsCard,
};
