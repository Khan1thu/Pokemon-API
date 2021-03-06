const {body} = require("express-validator");

const editTrainerSchema = [
    
    body("name")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your Name"),
    
    body("age")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your age")
    .isNumeric()
    .withMessage("Age must be number"),
    
    body("town")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill your town"),
    
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

module.exports = {editTrainerSchema};

