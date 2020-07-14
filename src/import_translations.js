import en from "./translations/en.js";
import fr from "./translations/fr.js";
import ru from "./translations/ru.js";
import db from "./config/dbConfig.js";

const trans = { en: en.translations, fr: fr.translations, ru: ru.translations };

const tryInsert = async (d) => {
  try {
    const res = await db("translations").insert(d);
    console.log("\n res:", res);
  } catch (e) {
    console.error("\n\n err", e);
  }
};

// можно сделать рекурсией
for (const [lang, data] of Object.entries(trans)) {
  //console.log(lang, data);
  for (const [gkey, obj] of Object.entries(data)) {
    //  console.log(`${gkey}: `);
    //console.log(Object.entries(value));
    for (const [tkey, tvalue] of Object.entries(obj)) {
      //console.log(`${gkey}:  ${tkey}:${tvalue}`);
      //console.log("\n");
      const dbDate = {
        account_id: 1,
        pname: "mobimed_site",
        lang,
        gkey,
        tkey,
        tvalue,
      };
      tryInsert(dbDate);
    }
  }
}
