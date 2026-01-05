const express = require("express");
const swaggerDocs = require("./swagger.js");
const swaggerUi = require("swagger-ui-express");
const log = require("./middlewares/log.js");
const router = require("./router.js");
const globalError = require("./middlewares/error.js");
const AppError = require("./utils/AppError.js");

const userRepository = require("./repository/userResponsitory.js");
const userController = require("./controller/userController.js");

const protectMiddle = require("./middlewares/protect.js");

const app = express();

app.use(log);
app.use(express.json());

//公開路由
app.post("/register", new userController(userRepository).register);
app.post("/login", new userController(userRepository).login);

app.use("/notes", protectMiddle, router);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//通用404
app.use((req, res, next) => {
  next(new AppError(`找不到路徑: ${req.originalUrl}`, 404));
});

app.use(globalError);

app.listen(3000, "0.0.0.0", () => {
  console.log("success to listen.");
});
