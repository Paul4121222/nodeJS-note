const { Router } = require("express");
const NoteController = require("./controller.js");
const Repository = require("./repository.js");

const repository = new Repository();
const controller = new NoteController(repository);
const router = Router();

router.get("/", controller.getNote);
router.post("/", controller.addNote);

module.exports = router;
