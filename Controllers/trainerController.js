const Trainer = require('../Models/trainerModel');
const bcrypt = require('bcrypt');
const generateToken = require("../middlewares/generateToken");
const fs = require('fs');

//get all trainer profile
const getAllTrainers = async (req, res) => {
    try {
      const trainers = await Trainer.find();
  
      res.send(trainers);
    } catch (error) {
      res.status(500);
    }
};
  
//get single Trainer
const getSingleTrainer = async (req, res) => {
    try {
      const trainers = await Trainer.findById(req.params.id);
  
      res.send(trainers);
    } catch (error) {
      res.status(500);
    }
  };

//get mine trainer profile
const getTrainerProfile = async(req,res) => {
    try {
        res.send({
            id : req.trainer._id,
            name : req.trainer.name,
            age: req.trainer.age,
            isProfessor: req.trainer.isProfessor,
            photo : req.trainer.photo,
        });
    } catch (error) {
        res.send(error);
    }
}

//createTrainer
const signUpTrainer = async(req,res)=>{
    const { name, age, isProfessor, password, confirmPassword, photo} = req.body;
    try {

        const hashPw = await bcrypt.hash(password, 8);

        const trainer = new Trainer({
            name,
            age,
            isProfessor,
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
                    isProfessor: trainer.isProfessor,
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

//Trainer logout
const traierLogOut = async (req, res) => {
    try {
      req.trainer.tokens = req.trainer.tokens.filter((token) => {
        return token.token != req.token;
      });
  
      await req.trainer.save();
  
      res.sendStatus(200);
    } catch (error) {
      res.send(500);
    }
  };

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

const changePassword = async(req, res) => {
    try{
        const trainer = await Trainer.findById(req.trainer._id);
    
        const samePw = await bcrypt.compare(String(req.body.prevPw), trainer.password);
    
        if(!samePw){
          res.status(400).send("Your Previous Password is wrong");
          return;
        }
    
        const hashPw = await bcrypt.hash(req.body.newPw,8);
    
        const updateData = {
          name: trainer.name,
          age: trainer.age,
          isProfessor: trainer.isProfessor,
          photo: trainer.photo,
          tokens: trainer.tokens,
          password: hashPw,
        };
    
        const updatetrainer = await Trainer.findByIdAndUpdate(req.trainer._id,updateData,{new:true,});
        console.log(updatetrainer);
      }catch(error){
        console.log(error);
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

module.exports = { getAllTrainers, 
    getSingleTrainer,
    signUpTrainer, 
    logInTrainer, 
    traierLogOut,
    getTrainerProfile, 
    editTrainer, 
    changePassword, 
    quitTrainer
};