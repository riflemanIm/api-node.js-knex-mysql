import ddd from "./translations/ru.json";

let parentTKeys = [];
let level = 0;
const transform = (object, gkey) => {
  for (const [tkey, obj] of Object.entries(object)) {
    //console.log("level:", level);

    //console.log("parentTKeys", parentTKeys, parentTKeys.length);
    if (typeof obj === "object") {
      parentTKeys.push(tkey);
      level++;
      transform(obj, gkey);
      level--;
    } else {
      const fullTKey =
        parentTKeys.length > 0 && typeof parentTKeys === "object"
          ? `${parentTKeys.join(".")}.${tkey}`
          : tkey;
      console.log(fullTKey);
    }
    parentTKeys = parentTKeys.slice(0, level);
  }
};

for (const [gkey, object] of Object.entries(ddd)) {
  //parentTKeys = [];
  console.log("----------------------- ");
  level = 0;

  if (typeof object === "string") {
    const fobj = {};
    fobj[`${gkey}`] = object;

    transform(fobj, "");
  } else {
    transform(object, gkey);
  }
}
