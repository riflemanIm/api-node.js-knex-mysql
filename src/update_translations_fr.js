import fr from "./translations/fr.js";
import db from "./config/dbConfig.js";

let parentTKeys = [];
let oldLevel = 0;
let level = 0;
const transform = async (object, gkey) => {
  for (const [tkey, obj] of Object.entries(object)) {
    console.log("level:", level, "  oldLevel:", oldLevel);

    console.log("parentTKeys", parentTKeys, parentTKeys.length);
    if (typeof obj === "object") {
      console.log("object");
      parentTKeys.push(tkey);
      level++;
      await transform(obj, gkey);
      level--;
      parentTKeys = parentTKeys.slice(0, level - 1);
    } else {
      const fullTKey =
        parentTKeys.length > 0 && typeof parentTKeys === "object"
          ? `${parentTKeys.join(".")}.${tkey}`
          : tkey;
      console.log(
        " gkey:",
        gkey,
        "\t",
        "parentTKeys:",
        parentTKeys,
        "\t",
        "tkey:",
        fullTKey,
        "\t",
        "lang_conent:",
        obj,

        "\n\n"
      );
    }
    oldLevel = level;
  }
};

for (const [gkey, object] of Object.entries(fr)) {
  parentTKeys = [];
  if (typeof object === "string") {
    level = 0;
    const fobj = {};
    fobj[`${gkey}`] = object;
    await transform(fobj, "");
  } else {
    level++;
    await transform(object, gkey);
  }
}
