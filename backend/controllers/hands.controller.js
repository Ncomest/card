const { default: axios } = require("axios");
const RandomDeck = require("../models/random-deck.model");

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


// Возвращает массив рандомных ID
const randomCards = () => {
  const cardsArr = [
    {
      quantity: 4,
      start_id: 1,
      end_id: 125,
    },
    {
      quantity: 5,
      start_id: 126,
      end_id: 570,
    },
    {
      quantity: 4,
      start_id: 571,
      end_id: 772,
    },
    {
      quantity: 3,
      start_id: 773,
      end_id: 830,
    },
  ];

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return cardsArr.flatMap(({ quantity, start_id, end_id }) => {
    const stackIdCard = new Set();

    while (stackIdCard.size < quantity) {
      stackIdCard.add(getRandomNumber(start_id, end_id));
    }

    return [...stackIdCard];
  });
};

//helper for addHandsCard
async function api(args) {
  try {
    if (args.user === "player1") {
      handArrP1 = [];
      let cardsId = randomCards();

      const cardsFromDB = await Promise.all(
        cardsId.map(async (id) => {
          return await RandomDeck.findById(id);
        })
      );

      handArrP1.push(...cardsFromDB);
      return handArrP1;
    } else if (args.user === "player2") {
      handArrP2 = [];
      let cardsId = randomCards();

      const cardsFromDB = await Promise.all(
        cardsId.map(async (id) => {
          return await RandomDeck.findById(id);
        })
      );

      handArrP2.push(...cardsFromDB);
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
    if (data.user === "player1") {
      handArrP1 = handArrP1.filter(
        (_, index) => index !== Number(data.cardIndex)
      );
      return res.status(200).json(handArrP1);
    } else if (data.user === "player2") {
      handArrP2 = handArrP2.filter(
        (_, index) => index !== Number(data.cardIndex)
      );
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
