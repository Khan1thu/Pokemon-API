const express = require("express");
const { signUpTrainer, logInTrainer, getTrainerProfile, editTrainer, quitTrainer } = require("../Controllers/trainerController");
const authMiddleware = require("../middlewares/authMiddleware");
const {signUpTrainerSchema}  = require("../Schema/signUpTrainerSchema");
const {editTrainerSchema} = require("../Schema/editTrainerMiddleware");
const {logInSchema} = require("../Schema/loginSchema")
const upload = require("../middlewares/fileUpload");
const validateReq = require("../middlewares/validateReq");
const trainerRoute = express.Router();

//get Trainer
trainerRoute.get("/mine", authMiddleware ,getTrainerProfile)

//singUp Trainer
trainerRoute.post("/signUpTrainer", upload.single('photo') ,signUpTrainerSchema, validateReq, signUpTrainer);

//Login Tainer
trainerRoute.post("/logIn", logInSchema ,logInTrainer);

//edit Trainer
trainerRoute.put("/editTrainer/:id", upload.single('photo'), editTrainerSchema ,authMiddleware, editTrainer);

//delete Trainer
trainerRoute.delete("/deleteTrainer", authMiddleware, quitTrainer);

module.exports = trainerRoute;