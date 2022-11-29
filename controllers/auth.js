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
  const { password, email, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing information" });
  }
  res.send("ok");
};

module.exports = { register, login };
