const adminMiddleware = async (req, res, next) => {
    if (req.trainer && req.trainer.isProfessor) {
      next();
    } else {
      res.status(401).send("You don't have permission");
    }
  };
  
  module.exports = adminMiddleware;
  