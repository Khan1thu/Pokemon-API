const express = require('express');
const { capturePokemon, getminePokemon, releasePokemon, editPokemon, makePokemonPublic } = require('../Controllers/pokemonController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require("../middlewares/fileUpload");
const validateReq = require('../middlewares/validateReq');

const router = express.Router();

router.post("/capturePokemon", authMiddleware  ,upload.single('photo'), validateReq , capturePokemon);

router.get("/getMinePokemon", authMiddleware, getminePokemon);

router.put("/editPokemon/:id", authMiddleware, upload.single('photo'), validateReq, editPokemon);

router.put("/public/:id", authMiddleware, makePokemonPublic);

router.delete("/releasePokemon/:id", authMiddleware, releasePokemon);

module.exports = router;