const {body} = require("express-validator");

const signUpTrainerSchema = [
    
    body("name")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your Name"),
    
    body("age")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your age")
    .isNumeric()
    .withMessage("Age must be number"),
    
    body("isProfessor")
    .exists({ checkFalsy: true })
    .withMessage("Are you a Professor"),
    
    body("password")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

    body("confirmPassword").custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Passwords should be match");
        }
    
        return true;
      }),
];

module.exports = {signUpTrainerSchema};

