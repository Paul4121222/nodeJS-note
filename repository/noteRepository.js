//資料層，負責拿資料/存資料
const knex = require("../db");
const AppError = require("../utils/AppError");
class Repository {
  notes = {};
  index = 0;

  saveNotes = async ({ content, username, userId }) => {
    await knex("notes").insert([
      {
        author: username,
        content,
        user_id: userId,
      },
    ]);
    const result = await knex("notes").select("*").orderBy("id");
    console.table(result);
  };

  getNotes = async ({ author, id }) => {
    const result = await knex("notes").select("*").where("user_id", id);
    if (!result || result.length === 0) {
      throw new AppError("找不到筆記", 404);
    }
    return result;
  };
}

module.exports = Repository;
