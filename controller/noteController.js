//處理商業邏輯
class NoteController {
  constructor(service) {
    this.service = service;
  }

  addNote = async (req, res) => {
    const content = req.body.content;
    const username = req.user.username;
    const userId = req.user.id;

    await this.service.saveNotes({
      content,
      username,
      userId,
    });
    res.status(200).json({
      msg: "成功",
    });
  };

  getNote = async (req, res) => {
    const id = req.user.id;
    const content = await this.service.getNotes({
      id,
    });

    res.status(200).json({
      msg: content,
    });
  };
}

module.exports = NoteController;
