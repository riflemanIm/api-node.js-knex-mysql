import fr from "./translations/fr.js";
import db from "./config/dbConfig.js";

const tryUpdate = async (d) => {
  try {
    const res = await db("translations")
      .where("gkey", d.gkey)
      .where("tkey", d.tkey)
      .update({ lang_fr: d.lang_fr });
    console.log("\n res:", res);
  } catch (e) {
    console.error("\n\n err", e);
  }
};

for (const [gkey, obj] of Object.entries(fr.translations)) {
  //  console.log(`${gkey}: `);
  //console.log(Object.entries(value));
  for (const [tkey, lang_fr] of Object.entries(obj)) {
    //console.log(`${gkey}:  ${tkey}:${tvalue}`);
    //console.log("\n");
    const dbDate = {
      account_id: 1,
      pname: "mobimed_site",
      gkey,
      tkey,
      lang_fr,
    };
    tryUpdate(dbDate);
  }
}
