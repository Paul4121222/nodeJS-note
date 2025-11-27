import express from "express";
import log from "./log.js";
const app = express();

const notes = {};
let index = 0;

app.use(log);
app.use(express.json());

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    msg: notes[id],
  });
});

app.post("/notes", (req, res) => {
  const content = req.body.msg;
  if (!content) {
    res.status(400).send("缺少c");
    return;
  }

  notes[index] = content;
  res.status(200).json({
    msg: "成功:" + index,
  });

  index++;
});

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
