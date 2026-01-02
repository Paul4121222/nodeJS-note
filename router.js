const { Router } = require("express");
const NoteController = require("./controller/noteController.js");
const Repository = require("./repository/noteRepository.js");
const validate = require("./middlewares/validate.js");
const { createNotesSchema, getNoteSchema } = require("./schemas/notes.js");

const repository = new Repository();
const controller = new NoteController(repository);
const router = Router();

router.get("/", controller.getNote);
router.post("/", validate(createNotesSchema), controller.addNote);

module.exports = router;
