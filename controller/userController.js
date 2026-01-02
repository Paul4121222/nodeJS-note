const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  constructor(service) {
    this.service = service;
  }

  signToken = ({ userId }) => {
    const token = jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRED,
      }
    );

    return token;
  };

  register = async (req, res, next) => {
    const { username, password } = req.body;
    const existUser = await this.service.findUserByName(username);
    if (existUser) {
      return next(new AppError("此使用者名稱已被註冊", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await this.service.createUser({
      username,
      password: hashedPassword,
    });
    const token = this.signToken({ userId });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          id: userId,
        },
      },
    });
  };
}

module.exports = userController;
