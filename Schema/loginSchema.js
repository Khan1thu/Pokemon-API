const {body} = require("express-validator");

const logInSchema = [
    body("name").exists({checkFalsy: true}).withMessage("Please fill your username"),
    body("password").exists({checkFalsy: true}).withMessage("Please fill your password")
]

module.exports = {logInSchema};



