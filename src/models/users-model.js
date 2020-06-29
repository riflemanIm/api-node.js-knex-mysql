const db = require("../config/dbConfig.js");

// GET ALL USERS
const find = () => {
  return db("user");
};

// GET SPECIFIC USER BY ID
const findById = (id) => {
  return db("user").where("id", id);

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM users
  //                  WHERE id = ${id}`);
};

// GET SPECIFIC ACCOUNT BY EMAIL
const findByEmail = (email) => {
  return db("account")
    .where("email", email)
    .first()
    .then((row) => row);
};

// ADD A USER
const addUser = (user) => {
  return db("users").insert(user, "id");
};

// UPDATE USER
const updateUser = (id, post) => {
  return db("user").where("id", id).update(post);
};

// REMOVE USER
const removeUser = (id) => {
  return db("user").where("id", id).del();
};

module.exports = {
  find,
  findById,
  addUser,
  updateUser,
  removeUser,
  findByEmail,
};
