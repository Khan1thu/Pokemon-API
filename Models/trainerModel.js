const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainerModel = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },

    age : {
        type : String,
        required : true,
    },

    isProfessor: {
        type : Boolean,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    photo : {
        type : String,
        required : true,
    },

    Pokemon : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Pokemon",
    },

    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
    ],

}, {timestamps : true}
);

const Trainer = mongoose.model("Trainer", trainerModel);
module.exports = Trainer;