//const db = require("../config/dbConfig.js");
import db from "../config/dbConfig.js";
import { localDateTime } from "../helpers/helpers";

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
    //.whereNot("e.photo", null)
    .orderBy("u.user_id", "desc")
    .limit(10);
  return r;
};

// CHECK username  not for current user
const findUsernameNotCurUser = (id, username) =>
  db("user")
    .whereNot("user_id", id)
    .where("username", username)
    .first()
    .then((row) => row.username)
    .catch(() => null);

// just CHECK username
const findUsername = (username) =>
  db("user")
    .where("username", username)
    .first()
    .then((row) => row.username)
    .catch(() => null);

// GET SPECIFIC USER BY ID
const findById = (id) => {
  return db
    .select(
      "u.user_id",
      "u.username",
      "u.phone",
      "u.notify_email",
      "e.first_name",
      "e.last_name",
      "e.middle_name",
      "e.gender",
      "e.birth_date",
      "u.cdate"
    )
    .from("user as u")
    .leftJoin("emr_group as e", "u.user_id", "e.user_id")
    .where("u.user_id", id);
};

// ADD A USER
const addUser = (user) => {
  //  return db("user").insert(user, "user_id");
  const cdate = localDateTime;
  return db.transaction(function (trx) {
    db("user")
      .transacting(trx)
      .insert({ ...user, cdate })
      .then(function (res) {
        const [user_id] = res;

        console.log("--- user_id ---", user_id, "cdate", cdate);
        return db("emr_group")
          .insert({
            user_id,
            cdate,
          })
          .then((r) => {
            console.log("--- r ---", r);
            return db("emr_group")
              .where("emr_group_id", r[0])
              .first()
              .then((row) => row.user_id)
              .catch(() => null);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

// SAVE USER AVATAR
const saveUserAvatar = (id, photo) => {
  console.log(id, "\n ------- avatar ------\n", photo);
  return db("emr_group").where("user_id", id).update({ photo });
};
// REMOVE USER AVATAR
const removeUserAvatar = (id) => {
  return db("emr_group").where("user_id", id).update({ photo: null });
};

// UPDATE USER
const updateUser = (id, post) => {
  //return db("user").where("user_id", id).update(post);

  const userPost = {
    // user_id: post.user_id,
    username: post.username,
    phone: post.phone,
    notify_email: post.notify_email,
  };

  const emrGroupPost = {
    first_name: post.first_name,
    last_name: post.last_name,
    middle_name: post.middle_name,
    gender: post.gender,
    birth_date: post.birth_date,
  };
  console.log("---------------\n userPost", userPost);
  return db("user")
    .where("user_id", id)
    .update(userPost)
    .then((r) => {
      if (r) {
        console.log("---------------\n emrGroupPost", emrGroupPost);
        return db("emr_group").where("user_id", id).update(emrGroupPost);
      }
    });
};

// REMOVE USER
const removeUser = (id) => {
  return db("user")
    .where("user_id", id)
    .del()
    .then((r) => {
      return db("emr_group").where("user_id", id).del();
    })
    .catch((e) => e);
};

module.exports = {
  find,
  findById,
  addUser,
  updateUser,
  removeUser,
  photoById,
  findUsernameNotCurUser,
  saveUserAvatar,
  removeUserAvatar,
  findUsername,
};
