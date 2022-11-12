const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      res.json({ message: "Token needed to access this route" });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = verifyToken;
