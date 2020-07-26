import express from "express";
import translationsDB from "../models/translations-model";
import { use } from "passport";
import multer from "multer";
import { tranformNoda } from "../helpers/helpers";
const upload = multer();
const router = express.Router();

// GET ALL TRANSLATION
router.get("/", async (req, res) => {
  try {
    const translations = await translationsDB.find();
    res.status(200).json(translations);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// GET TRANSLATION BY ID
router.get("/:id", async (req, res) => {
  const translationId = req.params.id;
  try {
    const translation = await translationsDB.findById(translationId);
    if (!translation) {
      res
        .status(404)
        .json({ err: "The translation with the specified id does not exist" });
    } else {
      //console.log("\n\n\n -- translation --- \n\n\n", translation);
      res.status(200).json(translation);
    }
  } catch (err) {
    res.status({ err: "The translation information could not be retrieved" });
  }
});

// GET TRANSLATION AS JSON
router.get("/download/:lang/:pname", async (req, res) => {
  const lang = req.params.lang;
  const pname = req.params.pname;
  try {
    const translation = await translationsDB.findByLangPName(lang, pname);
    if (!translation) {
      res
        .status(404)
        .json({ err: "The translation with the specified id does not exist" });
    } else {
      const object = translation.reduce((obj, item) => {
        if (item.gkey !== "") {
          return {
            ...obj,
            [item.gkey]: {
              ...obj[item.gkey],
              [item.tkey]: item[`lang_${lang}`],
            },
          };
        }
        return { ...obj, [item.tkey]: item[`lang_${lang}`] };
      }, {});
      //console.log("\n\n\n -- object --- \n\n\n", object);
      const objectTrans = {};
      Object.keys(object).forEach((gkey) => {
        // console.log("object", gkey, object[gkey]);
        if (typeof object[gkey] === "object") {
          objectTrans[gkey] = tranformNoda(object[gkey]);
        } else {
          objectTrans[gkey] = object[gkey];
        }

        //return { ...key[0] };
      }, {});

      //console.log("\n\n\n -- translation --- \n\n\n", objectTrans);
      res.writeHead(200, {
        "Content-Type": "application/json-my-attachment",
        "content-disposition": `attachment; filename="${lang}.json"`,
      });
      res.end(JSON.stringify(objectTrans));
    }
  } catch (err) {
    res.status({ err: "The translation information could not be retrieved" });
  }
});

// IMORT JSON
router.put("/import-file", upload.single("filedata"), async (req, res) => {
  try {
    if (!req.file) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "filename") to retrieve the uploaded file
      const { buffer } = req.file;
      const { filename, pname, account_id, checked } = req.body;
      const translationId = req.params.id;
      const translation = JSON.parse(buffer.toString("utf8"));

      const lang = filename.split(".")[0];
      console.log(
        "\n ------- lang ------\n",
        lang,
        pname,
        "checked",
        checked,
        "\n\n"
      );
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

            if (tkey !== "")
              translationsDB.saveTranslation(
                gkey,
                fullTKey,
                pname,
                obj,
                account_id,
                checked,
                lang
              );
          }
          oldLevel = level;
        }
      };

      for (const [gkey, object] of Object.entries(translation)) {
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
      //send response
      res.send({ status: "ok", filename });
    }
  } catch (err) {
    console.log("\n ------- err ------\n", err);
    res
      .status(500)
      .json({ err: "Error uploading file ", message: err.message });
  }
});

// INSERT TRANSLATION INTO DB
router.post("/", async (req, res) => {
  const newTranslation = req.body.data;
  console.log("newTranslation", newTranslation);
  try {
    translation = await translationsDB.addTranslation(newTranslation);
    console.log("\n\n\n addTranslation '" + translation + "' \n\n\n");
    res.status(201).json(translation);
  } catch (err) {
    res.status(500).json({ err: "Error in adding translation" });
  }
});
router.put("/checked", async (req, res) => {
  const post = req.body.data;

  try {
    const checkeds = await translationsDB.updateChecked(post);
    console.log("\n checkeds \n", checkeds);
    res.status(200).json(checkeds);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const translationId = req.params.id;
  const newChanges = req.body.data;

  try {
    const addChanges = await translationsDB.updateTranslation(
      translationId,
      newChanges
    );
    console.log("\n addChangesdddd \n", translationId, addChanges);
    res.status(200).json(addChanges);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const translationId = req.params.id;
  try {
    const deleting = await translationsDB.removeTranslation(translationId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting translation" });
  }
});

module.exports = router;
