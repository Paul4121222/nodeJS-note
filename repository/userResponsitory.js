const db = require("../db");

class userRepository {
  createUser = async function (userData) {
    const [result] = await db("users").insert(userData).returning("id");
    return result.id;
  };

  findUserByName = async (username) => {
    return await db("users").where({ username }).first();
  };

  findUserById = async (id) => {
    return await db("users").where({ id }).first();
  };
}

module.exports = userRepository;
