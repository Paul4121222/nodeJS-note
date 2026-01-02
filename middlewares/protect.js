const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userResponsitory");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
  }

  if (!token) {
    return next(new AppError("尚未登入，請先登入以取得權限", 401));
  }

  try {
    //verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await new userRepository().findUserById(userId);
    console.log(user);

    if (!user) {
      return next(new AppError("屬於此 Token 的使用者已不存在"), 401);
    }
    req.user = user;
    next();
  } catch (e) {
    return next(new AppError("Token 無效或已過期", 401));
  }
};
