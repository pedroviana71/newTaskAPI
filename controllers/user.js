const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

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
  const { id } = req.body;
  const user = await User.findById(id);

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You need to login" });
  }

  res.status(StatusCodes.OK).json({ id: user._id, email: user.email, username: user.username });
};

module.exports = { register, login, getUser };
