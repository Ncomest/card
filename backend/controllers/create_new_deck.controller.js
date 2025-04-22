const { default: mongoose } = require("mongoose");
const { randomDeckSchema } = require("../models/random-deck.model.js");
const RandomDeck = require("../models/random-deck.model.js");

const cache = new Map();

function setCache(key, data, ttl = 120000) {
  cache.set(key, { data, expire: Date.now() + ttl });
  setTimeout(() => cache.delete(key), ttl);
}

function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expire) {
    cache.delete(key);
    return null;
  }
  return cached.data;
}

// не используется
const allCards = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;

  const cacheKey = `cards-page-${page}-limit-${limit}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) return res.status(200).json(cachedData);

  try {
    const cards = await RandomDeck.find().skip(skip).limit(limit);
    const total = await RandomDeck.countDocuments();
    const pages = Math.ceil(total / limit);

    const response = { cards, total, page, pages };

    setCache(cacheKey, response, 120000);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const currentCard = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      cardName,
      cardCoins,
      cardType,
      cardElement,
    } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = {};

    if (cardName && cardName.trim() !== "") {
      filter.name = { $regex: new RegExp(cardName, "i") };
    }

    if (cardCoins) {
      filter.coin = cardCoins.toString();
    }

    if (cardType) {
      filter.type = cardType;
    }

    if (cardElement) {
      filter.element = cardElement;
    }

    const cards = await RandomDeck.find(filter).skip(skip).limit(Number(limit));

    const total = await RandomDeck.countDocuments(filter);

    if (cards.length > 0) {
      const pages = Math.ceil(total / limit);

      const response = { cards, total, page, pages };
      res.status(200).json(response);
    } else {
      res.status(200).json({ cards: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//надо протестировать
const createNewDeck = async (req, res) => {
  console.log(req.body.deckName);
  const { deckName, deckArr } = req.body;

  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
  
      // console.log(collections)
      
      const collectionsExists = collections.some((col) => col.name === deckName);
      // console.log(collectionsExists)

    if (collectionsExists) {
      return res.status(400).json({ message: "Такое название уже существует" });
    }

    const dynamicModel = mongoose.model(
      deckName, 
      new mongoose.Schema({
      // _id: {type: String, required: true},
      part: {type: String, required: true},
      name: {type: String,required: true},
      uri: {type: String,required: true},
      coin: {type: String,required: true},
      type: {type: String,required: true},
      element: {type: String,required: true} 
     }));
     
    //  console.log('first')
     //  console.log(deckArr)
     const cleanedId = deckArr.map(({ _id, ...rest }) => rest)
     await dynamicModel.insertMany(cleanedId);
    //  console.log(cleanedId)
    //  console.log('second')

    // const newDeck = await RandomDeck.find({})

    res.status(200).json({message: 'Колода успешно создана'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deteleDeck = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allCards,
  createNewDeck,
  currentCard,
  deteleDeck,
};
