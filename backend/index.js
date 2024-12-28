const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const addMoreDeck = require("./data/add_deck/add_deck.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { verifyAccessToken } = require("./constance/token.js");

// Routes import
// const humanRoutes = require("./routes/humans.route.js");
const randomDeckRoute = require("./routes/random-deck.route.js");
const handRoute = require("./routes/hand.route.js");
const selectPlayerRoute = require("./routes/select_player.route.js");
const playerRoute = require("./routes/player.route.js");
const tableRoute = require("./routes/table.route.js");
const diceRoute = require("./routes/dice_roll.route.js");
const decksRoute = require("./routes/decks.route.js");
const authRoute = require("./routes/auth.route.js");

const app = express();
const cors = require("cors");

const allowedOrigins = [
  process.env.WEB_SITE,
  process.env.LOCAL,
  process.env.IP_SITE,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked CORS request from origin: ${origin}`);
      callback(new Error("Не разрешенный источник"));
    }
  },
  credentials: true,
};

// Modules
// app.use(cors("http://localhost:3000")); // убать и раскоментировать ниженюю строку
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

addMoreDeck(app); /* 
                      создать автоматически колоду и добавить туда карту
                      PS. надо вписать название колоды в массив
                  */

// Routes
// app.use("/api/humans", humanRoutes);
app.use("/api/random-deck", randomDeckRoute);
app.use("/api/table", tableRoute);
app.use("/api/hand", handRoute);
app.use("/api/decks", decksRoute);
app.use("/api/select-player", selectPlayerRoute);
app.use("/api/player", playerRoute);
app.use("/api/dice", diceRoute);
app.use("/api/auth/v1", authRoute);

// Health route
app.get("/", (req, res) => {
  res.send("Hi my dear baby");
});

// Mongo DB
mongoose
  .connect(
    "mongodb+srv://admin:c0sQmrDsv4nfxUGy@backenddb.lfsny.mongodb.net/Cards?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("connent to database");
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("connect failed");
  });
