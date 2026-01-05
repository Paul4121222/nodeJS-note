const userController = require("../controller/userController");
const userRepository = require("../repository/userResponsitory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//告訴jest以下都是假的，所有底下的方法都是jest.fn，這樣做是避免被外部資訊干擾
jest.mock("../repository/userResponsitory");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("usercontroller -> register", () => {
  const controller = new userController(userRepository);

  test("當輸入帳號密碼，理應回傳token", async () => {
    userRepository.findUserByName.mockResolvedValue(undefined);
    bcrypt.hash.mockResolvedValue("hashed_secret_password");
    userRepository.createUser.mockResolvedValue(1);
    jwt.sign.mockReturnValue("fake_token");

    const req = {
      body: {
        username: "paul",
        password: "123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.register(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      username: "paul",
      password: "hashed_secret_password",
    });
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      token: "fake_token",
      data: {
        user: {
          id: 1,
        },
      },
    });
  });

  test("已存在使用者", async () => {
    userRepository.findUserByName.mockResolvedValue({ id: 1 });
    const req = {
      body: {
        username: "paul",
        password: "123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await controller.register(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].message).toMatch("註冊");
  });
});
