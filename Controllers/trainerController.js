const Trainer = require('../Models/trainerModel');
const bcrypt = require('bcrypt');
const generateToken = require("../middlewares/generateToken");
const fs = require('fs');

//get trainer profile
const getTrainerProfile = async(req,res) => {
    try {
        res.send({
            id : req.trainer._id,
            name : req.trainer.name,
            age: req.trainer.age,
            town: req.trainer.town,
            photo : req.trainer.photo,
        });
    } catch (error) {
        res.send(error);
    }
}

//createTrainer
const signUpTrainer = async(req,res)=>{
    const { name, age, town, password, confirmPassword, photo} = req.body;
    try {

        const hashPw = await bcrypt.hash(password, 8);

        const trainer = new Trainer({
            name,
            age,
            town,
            password : hashPw,
            photo : req.file.path
        });

        const token = await generateToken(trainer);
        await trainer.save();

        res.send({
            _id : trainer.id,
            name: trainer.name,
            age : trainer.age,
            town : trainer.town,
            photo : trainer.photo,
            token,
        });
    } catch (error) {
        res.send(error);
    }
}

//loginTrainer
const logInTrainer = async(req,res) => {
    try {
        const trainer = await Trainer.findOne({name : req.body.name});

        if(trainer){
            const samePw = await bcrypt.compare(req.body.password, trainer.password);

            if(samePw){
                const token = await generateToken(trainer);
                res.send({
                    name : trainer.name,
                    age: trainer.age,
                    town: trainer.town,
                    password : trainer.password,
                    photo : trainer.photo,
                    token,
                });
            }
        }else{
            res.send("wrong password or username");
        }
    } catch (error) {
        res.send(error);
    }
}

//editTrainer
const editTrainer = async(req,res) => {
    try {
        const trainer = await Trainer.findById(req.trainer._id);

        req.body.photo = req.file ? req.file.path : trainer.photo;
    
        if (req.file) {
          fs.unlinkSync(trainer.photo);
        }
    
        const updateDate = {
          ...req.body,
          password: trainer.password,
          tokens: trainer.tokens,
        };
    
        const updateTrainer = await Trainer.findByIdAndUpdate(req.trainer._id, req.body, {
          new: true,
        });
    
        res.status(200).send(updateTrainer);
    } catch (error) {
        res.send(error);
    }
}

//quit Trainer
const quitTrainer = async(req,res) => {
    try {
        const trainer = await Trainer.findById(req.trainer._id);
    
        fs.unlinkSync(trainer.photo);
        const deletedTrainer = await trainer.remove();
    
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
      }
}

module.exports = {signUpTrainer, logInTrainer, getTrainerProfile, editTrainer,  quitTrainer};