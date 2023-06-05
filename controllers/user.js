const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Token = require("../models/tokenPassword");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { password, email, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing information" });
    }

    const user = await User.create({ password, email, username });
    const token = user.createJWTToken();

    res.status(StatusCodes.CREATED).json({ email, username, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not found" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }

  const token = user.createJWTToken();

  res
    .status(StatusCodes.OK)
    .json({ id: user._id, email, token, username: user.username });
};

const getUser = async (req, res) => {
  const { id } = req.headers;
  const user = await User.findById(id);

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You need to login" });
  }

  res
    .status(StatusCodes.OK)
    .json({ id: user._id, email: user.email, username: user.username });
};

const createNewPassword = async (req, res) => {
  const { password, userId, token } = req.body;
  const tokenModel = await Token.findOne({ userId });

  console.log(tokenModel, userId, password, token);

  if (!userId || !password || !token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }

  const isMatch = await bcrypt.compare(token, tokenModel.token);

  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.updateOne({ _id: userId }, { password: hashedPassword });
    res.status(StatusCodes.OK).json({ message: "Password updated" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = { register, login, getUser, createNewPassword };
