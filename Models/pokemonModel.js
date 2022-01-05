const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonModel = new Schema({

    name : {
        type : String,
        required : true,
    },

    type : {
        type : String,
        required : true,
    },

    gender : {
        type: String,
        required : true,
    },
    
    photo : {
        type : String,
        required : true,
    },

    trainer : {
        type : Schema.Types.ObjectId,
        ref : "Trainer",
        required : true,
    }

}, {timestamps : true}
);

const Pokemon = mongoose.model("Pokemon", pokemonModel);
module.exports = Pokemon;