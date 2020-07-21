//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET ALL REGIONS
const find = () => {
  const r = db.select("region_id", "title", "sort").from("region_");
  return r;
};
// GET SPECIFIC REGION BY ID
const findById = (id) => {
  return db("region_").where("region_id", id);
};

// ADD A REGION
const addRegion = (region) => {
  return db("region_").insert(region);
};

// UPDATE REGION
const updateRegion = (id, post) => {
  const regionPost = {
    title: post.title,
    sort: post.sort,
  };
  console.log("\n---------------\n regionPost", regionPost);
  return db("region_").where("region_id", id).update(regionPost);
};

// REMOVE REGION
const removeRegion = (id) => {
  return db("region_").where("region_id", id).del();
};

module.exports = {
  find,
  findById,
  addRegion,
  updateRegion,
  removeRegion,
};
