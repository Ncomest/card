const Orc = require("../../models/orc.model");

const handArrP1 = [];

const handArrP2 = ["card2"];

const getHandsCard = async (req, res) => {
 try {
  const deck = await Orc.find({});
  handArrP1.push(...deck);
  res.status(200).json(handArrP1);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const addHandsCard = async (req, res) => {
 try {
  handArrP1.push(req.body.string);
  res.status(200).json(handArrP1);
  console.log(handArrP1);
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
