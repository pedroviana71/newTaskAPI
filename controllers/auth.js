const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  const { password, email, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }

  try {
    await User.create({ password, email, username });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }

  res.status(StatusCodes.CREATED).json({ email, username });
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
