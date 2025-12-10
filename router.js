import { Router } from "express";
import NoteController from "./controller.js";
import Repository from "./repository.js";
const repository = new Repository();
const controller = new NoteController(repository);
const router = Router();

router.get("/:id", controller.getNote);
router.post("/", controller.addNote);

export default router;
