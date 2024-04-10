require("dotenv").config();
const User = require("../models/user");
const Token = require("../models/tokenPassword");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Resend } = require("resend");

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const instanceResend = new Resend("re_QrXv6mVM_LLJZhYeZPsBhcbfPEv9ng15v");
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const token = await Token.findOne({ userId: user._id });

    if (token) {
      await Token.deleteOne({ userId: user._id });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);

    await Token.create({
      userId: user._id,
      token: hashedToken,
    });

    const link = `http://listing.bohr.io/reset-password/${user._id}/${resetToken}`;

    await instanceResend.emails.send({
      from: "pedrohenrique.viana5@gmai..com",
      to: email,
      subject: "edefinicao de senha",
      html: "<strong>it works!</strong>",
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset link sent to your email" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

module.exports = resetPassword;
