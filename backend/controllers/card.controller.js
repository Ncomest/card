const getCards = (Deck) => async (req, res) => {
 try {
  const card = await Deck.find({});
  res.status(200).json(card);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const getCardById = (Deck) => async (req, res) => {
 try {
  const { id } = req.params;
  const card = await Deck.findById(id);
  res.status(200).json(card);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const createCard = (Deck) => async (req, res) => {
 try {
  const card = await Deck.create(req.body);
  res.status(200).json(card);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateCard = (Deck) => async (req, res) => {
 try {
  const { id } = req.params;
  const card = await Deck.findByIdAndUpdate(id, req.body);
  if (!card) res.status(404).json({ message: "Card not found" });
  const updatedCard = await Deck.findById(id);
  res.status(200).json(updatedCard);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const deleteCard = (Deck) => async (req, res) => {
 try {
  const { id } = req.params;
  const card = await Deck.findByIdAndDelete(id);
  if (!card) res.status(404).json({ message: "Card not found" });
  res.status(200).json({ message: "Success deleted" });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getCards,
 getCardById,
 createCard,
 updateCard,
 deleteCard,
};
