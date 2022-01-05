const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const trainerRoute = require('./Routes/trainerRoutes');
const pokemonRoutes = require('./Routes/pokemonRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/trainer", trainerRoute);
app.use("/pokemon", pokemonRoutes);

mongoose.connect("mongodb://localhost:27017/PC").then(() => {
  console.log("Database is connected");
  app.listen("3000", () => {
    console.log("Server is running on port at: 3000");
  });
});