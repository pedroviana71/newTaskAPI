require("dotenv").config();
const User = require("../models/user");
const Token = require("../models/tokenPassword");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
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
    console.log(user._id, resetToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "listing.app0@gmail.com",
        pass: process.env.PASSWORD_MAIL,
        clientId: process.env.CLIENT_ID_MAIL,
        clientSecret: process.env.CLIENT_SECRET_MAIL,
        refreshToken: process.env.REFRESH_TOKEN_MAIL,
      },
    });

    const mailOptions = {
      from: "listing.app0@gmail.com",
      to: user.email,
      subject: "Recuperação de senha - Listing App",
      text: `Você solicitou um link para recuperação de senha no Listing. Clique no link abaixo para redefinir sua senha. 
      \n\n
      ${link}
      \n\n
      Se você não solicitou essa recuperação, ignore esse email e sua senha permanecerá inalterada.\n`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).send("Email not sent");
      } else {
        return res.status(StatusCodes.OK).send("Email sent");
      }
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error, message: "Internal server error" });
  }
};

module.exports = resetPassword;
