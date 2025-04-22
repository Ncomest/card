const { default: mongoose } = require("mongoose");
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

const randomHandsCard = async (req, res) => {
  try {
    const params = req.body;

    if (params.user === "player1") {
      //fn для игрока 1
      handArrP1 = [];
      const cardsArr = (await randomCards()).sort((a, b) => a.coin - b.coin);
      handArrP1.push(...cardsArr);
      console.log("hand1", handArrP1);
      return res.status(200).json(handArrP1);
    } else {
      handArrP2 = [];
      const cardsArr = (await randomCards()).sort((a, b) => a.coin - b.coin);
      handArrP2.push(...cardsArr);
      return res.status(200).json(handArrP2);
      //fn для игрока 2
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Возвращает массив руки
const randomCards = async () => {
  const cardsArray = [];
  const stackIdCard = new Set();

  for (let i = 1; i <= 4; i++) {
    const partArray = await RandomDeck.find({ part: `${i}` });

    // Перемешивание массива и выбор первых 4 элементов
    const selectCard = [];
    const usedIndexes = new Set(); // Для хранения использованных индексов

    while (selectCard.length < 4) {
      const randomIndex = Math.floor(Math.random() * partArray.length);

      if (!usedIndexes.has(randomIndex)) {
        const card = partArray[randomIndex];
        if (!stackIdCard.has(card._id)) {
          selectCard.push(card);
          stackIdCard.add(card._id);
          usedIndexes.add(randomIndex);
        }
      }
    }
    cardsArray.push(...selectCard);
  }

  console.log(cardsArray);
  return cardsArray;
};

// Перетасовывает массив - испл в currentDeck
function shuffleArray(arr) {
  const newArr = [...arr];

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }

  return newArr.slice(0, 16);
}

const currentDeck = async (req, res) => {
  const { deckName, user } = req.body;
  console.log(deckName);
  console.log(deckName === "elves");

  try {
    const data = await mongoose.connection.db
      .collection(deckName)
      .find({})
      .toArray();

    if (user === "player1") {
      const shuffledArr = shuffleArray(data)
      handArrP1 = [];
      handArrP1.push(...shuffledArr);
      return res.status(200).json(handArrP1);
    } else if (user === "player2") {
      const shuffledArr = shuffleArray(data)
      handArrP2 = [];
      handArrP2.push(...shuffledArr);
      return res.status(200).json(handArrP2);
    } else if (!user || user.length <= 1) {
      return res.status(400).json({ message: "Игрок не выбран" });
    }
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
  currentDeck,
  updateHandsCard,
  refreshHandsCard,
  filterHandsCard,
};
