//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET USER PHOTO BY ID
const photoById = (id) => {
  return db.select("photo").from("emr_group").where("user_id", id);
};

// GET ALL USERS
const find = () => {
  const r = db
    .select(
      "u.user_id",
      "u.username",
      "u.notify_email",
      "e.birth_date",
      "u.cdate",
      "e.first_name",
      "e.gender",
      "e.last_name",
      "e.middle_name",
      "u.activation_state"
    )
    .from("user as u")
    .leftJoin("emr_group as e", "u.user_id", "e.user_id")
    .distinct()
    .whereNot("e.photo", null)
    .limit(100);
  return r;
};

// GET SPECIFIC USER BY ID
const findById = (id) => {
  return db
    .select(
      "u.user_id",
      "u.username",
      "u.notify_email",
      "e.birth_date",
      "u.cdate",
      "e.first_name",
      "e.gender",
      "e.last_name",
      "e.middle_name",
      "e.photo"
    )
    .from("user as u")
    .leftJoin("emr_group as e", "u.user_id", "e.user_id")
    .where("u.user_id", id);

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM users
  //                  WHERE id = ${id}`);
};

// ADD A USER
const addUser = (user) => {
  return db("users").insert(user, "user_id");
};

// UPDATE USER
const updateUser = (id, post) => {
  return db("user").where("user_id", id).update(post);
};

// REMOVE USER
const removeUser = (id) => {
  return db("user").where("user_id", id).del();
};

module.exports = {
  find,
  findById,
  addUser,
  updateUser,
  removeUser,
  photoById,
};
