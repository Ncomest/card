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

const allCards = async (req, res) => {
  // не используется
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

const createNewDeck = async (req, res) => {
  // console.log(req.body);
  const { deckName, deckArr } = req.body;

  try {
    res.status(200).json({ message: "success" });
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
