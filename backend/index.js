const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/product.route.js");
const orcRoutes = require("./routes/orcs.route.js");
const handRoute = require("./routes/hand.route.js");
const selectPlayerRoute = require("./routes/select_player.route.js");
const playerRoute = require("./routes/player.route.js");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/orcs", orcRoutes);
app.use("/api/hand", handRoute);
app.use("/api/select-player", selectPlayerRoute);
app.use("/api/player", playerRoute);

app.get("/", (req, res) => {
 res.send("Hi my dear baby");
});

mongoose
 .connect(
  "mongodb+srv://admin:c0sQmrDsv4nfxUGy@backenddb.lfsny.mongodb.net/Cards?retryWrites=true&w=majority&appName=BackendDB"
 )
 .then(() => {
  console.log("connent to database");
  app.listen(4000, () => {
   console.log("server on port 4000");
  });
 })
 .catch(() => {
  console.log("connect failed");
 });
