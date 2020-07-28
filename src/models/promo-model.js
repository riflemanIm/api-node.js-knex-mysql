//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET ALL PROMOS
const find = () => {
  const r = db("medicalnet_actions");
  return r;
};
// GET SPECIFIC PROMO BY ID
const findById = (id) => {
  return db("medicalnet_actions").where("medicalnet_actions_id", id);
};

// ADD A PROMO
const addPromo = (promo) => {
  return db("medicalnet_actions").insert(promo);
};

// UPDATE PROMO
const updatePromo = (id, post) => {
  return db("medicalnet_actions")
    .where("medicalnet_actions_id", id)
    .update(post);
};

// REMOVE PROMO
const removePromo = (id) => {
  return db("medicalnet_actions").where("medicalnet_actions_id", id).del();
};

module.exports = {
  find,
  findById,
  addPromo,
  updatePromo,
  removePromo,
};
