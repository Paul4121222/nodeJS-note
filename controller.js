//處理商業邏輯
class NoteController {
  constructor(service) {
    this.service = service;
  }

  addNote = (req, res) => {
    const content = req.body.msg;
    if (!content) {
      res.status(400).send("缺少c");
      return;
    }
    const index = this.service.saveNotes(content);
    res.status(200).json({
      msg: "成功:" + index,
    });
  };

  getNote = (req, res) => {
    const id = req.params.id;
    res.status(200).json({
      msg: this.service.get(id),
    });
  };
}

export default NoteController;
