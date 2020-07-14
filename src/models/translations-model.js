import db from "../config/dbConfig.js";

// GET ALL TRANSLATIONS
const find = () => {
  return db("translations");
};
// GET SPECIFIC TRANSLATION BY ID
const findById = (id) => {
  return db("translations").where("id", id);
};

// ADD A TRANSLATION
const addTranslation = (translation) => {
  //const cdate = new Date().toISOString().slice(0, 19).replace("T", " ");
  return db("translations").insert(translation);
};

// UPDATE TRANSLATION
const updateTranslation = (id, post) => {
  console.log("\n---------------\n translation Post", post);
  return db("translations").where("id", id).update(post);
};

// REMOVE TRANSLATION
const removeTranslation = (id) => {
  return db("translations").where("id", id).del();
};

module.exports = {
  find,
  findById,
  addTranslation,
  updateTranslation,
  removeTranslation,
};
