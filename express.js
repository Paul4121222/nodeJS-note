const express = require("express");
const log = require("./middlewares/log.js");
const router = require("./router.js");
const globalError = require("./middlewares/error.js");
const AppError = require("./utils/AppError.js");

const app = express();

app.use(log);
app.use(express.json());
app.use("/notes", router);

//通用404
app.use((req, res, next) => {
  next(new AppError(`找不到路徑: ${req.originalUrl}`, 404));
});

app.use(globalError);

app.listen(3000, "0.0.0.0", () => {
  console.log("success to listen.");
});
