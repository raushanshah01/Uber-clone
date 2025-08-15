const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  //finding the user by token
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  const isBlacklisted = await userModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user; // attaching user to request object
    return next(); // proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
