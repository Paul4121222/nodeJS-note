//自定義錯誤
//方便分類，分404/500/401之類
//方便辨識:屬於哪種錯誤

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    //status回傳給使用者
    this.statusCode = statusCode;
    this.status = String(this.statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true; //區分是預期的錯誤
    //在stack trace 隱藏
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
