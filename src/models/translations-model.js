import db from "../config/dbConfig.js";
import { localDateTime } from "../helpers/helpers";
import { defLangObj } from "../helpers/helpers";

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
const findByKeys = (pname, gkey, tkey) => {
  return db("translations")
    .where("pname", pname)
    .where("gkey", gkey)
    .where("tkey", tkey)
    .first();
};
const findByLangPName = (lang, pname) => {
  return db
    .select("gkey", "tkey", `lang_${lang}`)
    .from("translations")
    .where("pname", pname)
    .orderBy([{ column: "gkey" }, { column: "tkey" }]);
};
// ADD A TRANSLATION
const addTranslation = (translation) => {
  return db("translations").insert(translation);
};

// UPDATE TRANSLATION
const updateTranslationByJSON = (id, data, lang) => {
  const updated_at = localDateTime;

  return db("translations")
    .first()
    .where("id", id)
    .then((old) => {
      if (lang === "ru") {
        const checked_ru = old.account_id === 26; //
        console.log("checked_ru", checked_ru);
        return db("translations")
          .where("id", id)
          .update({ ...data, checked_ru, updated_at });
      }
      if (lang === "en") {
        const checked_en = old.checked_en && old.account_id === 26;
        return db("translations")
          .where("id", id)
          .update({ ...data, checked_en, updated_at });
      }
      if (lang === "fr") {
        const checked_fr = old.checked_fr && old.account_id === 26;
        return db("translations")
          .where("id", id)
          .update({ ...data, checked_fr, updated_at });
      }
    });

  //return db("translations").where("id", id).update(data);
};

// UPDATE CHECKEDS
const updateChecked = (post) => {
  const updated_at = localDateTime;
  const { selected, checked_en, checked_ru, checked_fr, account_id } = post;
  console.log("ids \n\n ", selected);

  return db("translations").whereIn("id", selected).update({
    updated_at,
    checked_en,
    checked_ru,
    checked_fr,
    account_id,
  });
};

// UPDATE TRANSLATION
const updateTranslation = (id, post) => {
  const updated_at = localDateTime;

  return db("translations")
    .where("id", id)
    .update({
      ...post,
      updated_at,
    });

  // COMPARE WITH OLD VALUE
  // return db("translations")
  //   .first()
  //   .where("id", id)
  //   .then((res) => {
  //     const checked_en = post.checked;
  //     const checked_ru = post.checked;
  //     const checked_fr = post.checked;

  //     const checked_en = post.checked || post.lang_en === res.lang_en;
  //     const checked_ru = post.checked || post.lang_ru === res.lang_ru;
  //     const checked_fr = post.checked || post.lang_fr === res.lang_fr;

  //     return db("translations").where("id", id).update({
  //       lang_en: post.lang_en,
  //       lang_ru: post.lang_ru,
  //       lang_fr: post.lang_fr,
  //       checked_en,
  //       checked_ru,
  //       checked_fr,
  //       updated_at,
  //     });
  //   });

  //return db("translations").where("id", id).update(post);
};

const saveTranslation = (
  gkey,
  tkey,
  pname,
  lang_conent,
  account_id,
  checked,
  lang
) => {
  return findByKeys(pname, gkey, tkey)
    .then((r) => {
      if (r) {
        const translation = updateTranslationByJSON(
          r.id,
          defLangObj(lang, lang_conent, checked),
          lang
        );
        //console.log("\n ------- translation update ------\n", translation);
        return translation;
      } else {
        const data = {
          account_id,
          pname,
          gkey,
          tkey,
          ...defLangObj(lang, lang_conent, checked),
        };

        const translation = addTranslation(data);
        //console.log("\n ------- translation insert ------\n", translation);
        return translation;
      }
    })
    .catch((err) => {
      console.log("\n ------- err update ------\n", err);
    });
};

// REMOVE TRANSLATION
const removeTranslation = (id) => {
  return db("translations").where("id", id).del();
};

module.exports = {
  find,
  findById,
  findByKeys,
  findByLangPName,
  addTranslation,
  updateTranslation,
  updateChecked,
  updateTranslationByJSON,
  removeTranslation,
  saveTranslation,
};
