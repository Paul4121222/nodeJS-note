//處理商業邏輯
class NoteController {
  constructor(service) {
    this.service = service;
  }

  addNote = async (req, res) => {
    const content = req.body.content;
    const author = req.body.author;

    await this.service.saveNotes({
      content,
      author,
    });
    res.status(200).json({
      msg: "成功",
    });
  };

  getNote = async (req, res) => {
    const author = req.query.author;
    const content = await this.service.getNotes({
      author,
    });

    res.status(200).json({
      msg: content,
    });
  };
}

module.exports = NoteController;
