const Pokemon = require("../Models/pokemonModel");
const fs = require("fs");

const getminePokemon = async(req,res) => {
    try{

        const pokemon = await Pokemon.find({trainer: req.trainer.id})

        res.send(pokemon);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const capturePokemon = async (req,res) => {
    const {name , type , gender, photo, trainer} = req.body;

    try{
       const pokemon = new Pokemon({
           name,
           type,
           gender,
           photo : req.file.path,
           trainer,
       });
       
       await pokemon.save();
       res.send(pokemon);
    }catch(error){
        res.send(error);
    }
}

const editPokemon = async(req, res) => {
    try{
        const { id } = req.params;
        const pokmeonId = req.trainer._id;

        const pokemonEdit = await Pokemon.findOne({id: _id,  trainer: pokmeonId});

        req.body.photo = req.file ? req.file.path : pokemon.photo;

        if (req.file) {
          fs.unlinkSync(pokemon.photo);
        }

        const pokemon = await Pokemon.findOneAndUpdate({id: _id,  trainer: pokemonEdit}, {...req.body}, {new:true});

        res.send(pokemon);
    }catch(error){
        res.send(error);
    }
}

const releasePokemon = async(req,res) => {
    try{
        const { id } = req.params;

        const releasedPokemon = await Pokemon.findOne({_id : id, trainer: req.trainer._id});

        fs.unlinkSync(releasedPokemon.photo);

        await Pokemon.findOneAndDelete({_id : id, trainer: req.trainer._id});
        
        res.send("Ok");
    }catch(error){
        res.send(error);
    }
}


module.exports = {capturePokemon, getminePokemon, releasePokemon, editPokemon};