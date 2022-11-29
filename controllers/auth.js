const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  const { password, email, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { password: hashedPassword, email, username };
  const user = await User.create(tempUser);

  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  const { password, email, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }
  res.send("ok");
};

module.exports = { register, login };
