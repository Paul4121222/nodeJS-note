const AppError = require("../utils/AppError");

describe("AppError Class 錯誤", () => {
  it("404錯誤", () => {
    const message = "找不到資料";
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    expect(error.statusCode).toBe(404);
    expect(error.status).toBe("fail");
  });

  it("500錯誤", () => {
    const message = "伺服器有錯";
    const statusCode = 500;
    const error = new AppError(message, statusCode);

    expect(error.statusCode).toBe(500);
    expect(error.status).toBe("error");
  });
});
