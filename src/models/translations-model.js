import db from "../config/dbConfig.js";

// GET ALL TRANSLATIONS
const find = () => {
  return db
    .select(
      "t.gkey",
      "t.id",
      "t.pname",
      "t.tkey",
      "t.lang_ru",
      "t.lang_en",
      "t.lang_fr",
      "t.checked_ru",
      "t.checked_en",
      "t.checked_fr",
      "t.created_at",
      "t.updated_at",
      "a.email",
      "a.fname",
      "a.lname"
    )
    .from("translations as t")
    .leftJoin("account as a", "a.account_id", "t.account_id");
};

// GET SPECIFIC TRANSLATION BY ID
const findById = (id) => {
  return db("translations").where("id", id).first();
};

// ADD A TRANSLATION
const addTranslation = (translation) => {
  //const cdate = new Date().toISOString().slice(0, 19).replace("T", " ");
  return db("translations").insert(translation);
};

// UPDATE TRANSLATION
const updateTranslation = (id, post) => {
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  return db("translations")
    .first()
    .where("id", id)
    .then((res) => {
      const checked_en = post.lang_en !== res.lang_en;
      const checked_ru = post.lang_ru !== res.lang_ru;
      const checked_fr = post.lang_fr !== res.lang_fr;
      return db("translations").where("id", id).update({
        lang_en: post.lang_en,
        lang_ru: post.lang_ru,
        lang_fr: post.lang_fr,
        checked_en,
        checked_ru,
        checked_fr,
        updated_at,
      });
    });

  //return db("translations").where("id", id).update(post);
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
