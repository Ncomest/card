const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

const humanRoutes = require("./routes/humans.route.js");
const orcRoutes = require("./routes/orcs.route.js");
const handRoute = require("./routes/hand.route.js");
const selectPlayerRoute = require("./routes/select_player.route.js");
const playerRoute = require("./routes/player.route.js");
const tableRoute = require("./routes/table.route.js");
const diceRoute = require("./routes/dice_roll.route.js");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/table", tableRoute);
app.use("/api/hand", handRoute);
app.use("/api/humans", humanRoutes);
app.use("/api/orcs", orcRoutes);
app.use("/api/select-player", selectPlayerRoute);
app.use("/api/player", playerRoute);
app.use("/api/dice", diceRoute);

app.get("/", (req, res) => {
 res.send("Hi my dear baby");
});

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
