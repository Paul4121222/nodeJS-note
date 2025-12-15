//資料層，負責拿資料/存資料
const knex = require("./db");
const AppError = require("./utils/AppError");
class Repository {
  notes = {};
  index = 0;

  saveNotes = async ({ content, author }) => {
    await knex("notes").insert([
      {
        author,
        content,
      },
    ]);
    const result = await knex("notes").select("*").orderBy("id");
    console.table(result);
  };

  getNotes = async ({ author }) => {
    const result = await knex("notes").select("*").where("author", author);
    if (!result || result.length === 0) {
      throw new AppError("找不到筆記", 404);
    }
    return result;
  };
}

module.exports = Repository;
