const { Router } = require("express");
const NoteController = require("./controller/noteController.js");
const Repository = require("./repository/noteRepository.js");
const validate = require("./middlewares/validate.js");
const { createNotesSchema, getNoteSchema } = require("./schemas/notes.js");

const repository = new Repository();
const controller = new NoteController(repository);
const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Notes
 *    description: 筆記管理相關 API
 */
/**
 * @swagger
 * /notes:
 *  get:
 *      summary: 搜尋/取得筆記
 *      description: 根據作者搜尋筆記
 *      tags: [Notes]
 *      responses:
 *          200:
 *              description: 成功取得筆記列表
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: 成功
 */
router.get("/", controller.getNote);

router.post("/", validate(createNotesSchema), controller.addNote);

module.exports = router;
