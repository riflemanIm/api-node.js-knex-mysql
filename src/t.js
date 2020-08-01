import ddd from "./translations/fr.json";

let parentTKeys = [];
let oldLevel = 0;
let level = 0;
const transform = (object, gkey) => {
  for (const [tkey, obj] of Object.entries(object)) {
    //console.log("level:", level, "  oldLevel:", oldLevel);

    console.log("parentTKeys", parentTKeys, parentTKeys.length);
    if (typeof obj === "object") {
      console.log("object");
      parentTKeys.push(tkey);
      level++;
      transform(obj, gkey);

      parentTKeys = parentTKeys.slice(0, level);
    } else {
      const fullTKey =
        parentTKeys.length > 0 && typeof parentTKeys === "object"
          ? `${parentTKeys.join(".")}.${tkey}`
          : tkey;
      console.log(
        fullTKey,
        "\t",
        "lang_conent:",
        obj,

        "\n\n"
      );
    }
    oldLevel = level;
    level--;
  }
};

for (const [gkey, object] of Object.entries(ddd)) {
  parentTKeys = [];
  if (typeof object === "string") {
    level = 0;
    const fobj = {};
    fobj[`${gkey}`] = object;
    transform(fobj, "");
  } else {
    level++;
    transform(object, gkey);
  }
}
