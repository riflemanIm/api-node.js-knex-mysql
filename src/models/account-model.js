//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET SPECIFIC ACCOUNT BY EMAIL
export const findByEmail = (email) => {
  return db("account")
    .where("email", email)
    .first()
    .then((row) => row)
    .catch((err) => {
      console.log("Err findByEmail:", err);
    });
};
