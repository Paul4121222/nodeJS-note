//資料層，負責拿資料/存資料
class Repository {
  notes = {};
  index = 0;

  saveNotes = (note) => {
    const currentId = this.index;
    this.notes[currentId] = note;
    this.index++;

    return currentId;
  };

  get = (id) => {
    return this.notes[id];
  };
}

export default Repository;
