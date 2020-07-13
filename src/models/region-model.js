//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET ALL REGIONS
const find = () => {
  const r = db.select("title", "sort").from("region_");
  return r;
};
// GET SPECIFIC REGION BY ID
const findById = (id) => {
  return db("region_").where("region_id", id);
};

// ADD A REGION
const addRegion = (region) => {
  //const cdate = new Date().toISOString().slice(0, 19).replace("T", " ");
  return db("region").insert(region);
};

// UPDATE REGION
const updateRegion = (id, post) => {
  const regionPost = {
    title: post.title,
    sort: post.sort,
  };
  console.log("\n---------------\n regionPost", regionPost);
  return db("region").where("region_id", id).update(regionPost);
};

// REMOVE REGION
const removeRegion = (id) => {
  return db("region")
    .where("region_id", id)
    .del()
    .then((r) => {
      return db("emr_group").where("region_id", id).del();
    })
    .catch((e) => e);
};

module.exports = {
  find,
  findById,
  addRegion,
  updateRegion,
  removeRegion,
};
