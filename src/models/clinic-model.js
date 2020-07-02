//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";

// GET ALL CLINICS
const find = () => {
  // SELECT  c.logo, c.title, c.url, c.address, c.is_home_request, mn.title medical_net
  // FROM clinic c
  // LEFT JOIN medical_net mn ON mn.medical_net_id=c.medical_net_id
  const r = db
    .select(
      "c.logo",
      "c.title",
      "c.url",
      "c.address",
      "mn.title as medical_net"
    )
    .from("clinic as c")
    .leftJoin("medical_net as mn", "c.medical_net_id", "mn.medical_net_id")
    //.distinct()
    //.whereNot("e.photo", null)
    .limit(100);
  return r;
};

module.exports = {
  find,
  //   findById,
  //   addUser,
  //   updateUser,
  //   removeUser,
  //   photoById,
};
