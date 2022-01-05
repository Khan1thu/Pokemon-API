const jwt = require("jsonwebtoken");
const Trainer = require("../Models/trainerModel");


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decode = jwt.verify(token, 'secret');
    const trainer = await Trainer.findOne({ _id: decode._id, "tokens.token": token });
    if (!trainer) {
      throw new Error();
    }

    req.trainer = trainer;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authMiddleware;
