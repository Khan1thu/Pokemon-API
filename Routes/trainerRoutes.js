const express = require("express");
const { getAllTrainers, 
    getSingleTrainer,
    signUpTrainer, 
    logInTrainer, 
    traierLogOut,
    getTrainerProfile, 
    editTrainer, 
    changePassword, 
    quitTrainer } = require("../Controllers/trainerController");
const authMiddleware = require("../middlewares/authMiddleware");
const {signUpTrainerSchema}  = require("../Schema/signUpTrainerSchema");
const {editTrainerSchema} = require("../Schema/editTrainerMiddleware");
const {logInSchema} = require("../Schema/loginSchema");
const upload = require("../middlewares/fileUpload");
const validateReq = require("../middlewares/validateReq");
const adminMiddleware = require("../middlewares/adminMiddleware");
const trainerRoute = express.Router();

//get All Trainers
trainerRoute.get("/", authMiddleware, adminMiddleware, getAllTrainers);

//get Trainer
trainerRoute.get("/mine", authMiddleware ,getTrainerProfile)

//get Single Traier
trainerRoute.get("/:id", authMiddleware, adminMiddleware, getSingleTrainer);

//singUp Trainer
trainerRoute.post("/signUpTrainer", upload.single('photo') ,signUpTrainerSchema, validateReq, signUpTrainer);

//Login Tainer
trainerRoute.post("/logIn", logInSchema ,logInTrainer);

//signout Trainer
trainerRoute.post("/signOut", authMiddleware, traierLogOut);

//edit Trainer
trainerRoute.put("/editTrainer/:id", upload.single('photo'), editTrainerSchema ,authMiddleware, editTrainer);

//edit password
trainerRoute.put("/changePassword", authMiddleware, changePassword);

//delete Trainer
trainerRoute.delete("/deleteTrainer", authMiddleware, quitTrainer);

module.exports = trainerRoute;