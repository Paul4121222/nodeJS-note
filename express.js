const express = require("express");
const log = require("./log.js");
const router = require("./router.js");

const app = express();

app.use(log);
app.use(express.json());
app.use("/notes", router);

//通用404
app.use((req, res) => {
  res.status(404).json({
    msg: "NOT FOUND.",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    err: err.message,
    msg: "Error!!",
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("success to listen.");
});
