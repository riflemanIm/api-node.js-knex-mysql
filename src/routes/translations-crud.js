import express from "express";
import translationsDB from "../models/translations-model";
import { use } from "passport";
import multer from "multer";
import { defLangObj } from "../helpers/helpers";

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

// GET USER BY ID
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
      const userId = req.params.id;
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

      for (const [gkey, obj] of Object.entries(translation)) {
        //  console.log(`${gkey}: `);
        //console.log(Object.entries(value));
        for (const [tkey, lang_conent] of Object.entries(obj)) {
          //console.log(`${gkey}:  ${tkey}:${tvalue}`);
          //console.log("\n");
          await translationsDB
            .findByKeys(pname, gkey, tkey)
            .then(async (r) => {
              if (r) {
                const translation = await translationsDB.updateTranslation(
                  r.id,
                  defLangObj(lang, lang_conent, checked),
                  checked,
                  lang
                );
                // console.log(
                //   "\n ------- translation update ------\n",
                //   translation
                // );
              } else {
                const data = {
                  account_id,
                  pname,
                  gkey,
                  tkey,
                  ...defLangObj(lang, lang_conent, checked),
                };

                const translation = await translationsDB.addTranslation(data);
                // console.log(
                //   "\n ------- translation insert ------\n",
                //   translation
                // );
              }
            })
            .catch((err) => {
              console.log("\n ------- err update ------\n", err);
            });
        }
      }

      //send response
      res.send({ status: "ok", filename });
    }
  } catch (err) {
    console.log("\n ------- err ------\n", err);
    res.status(500).json({ err: "Error uploading file " });
  }
});

// INSERT USER INTO DB
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

router.put("/:id", async (req, res) => {
  const translationId = req.params.id;
  const newChanges = req.body.data;

  try {
    const addChanges = await translationsDB.updateTranslation(
      translationId,
      newChanges
    );
    console.log("\n addChanges\n", translationId, addChanges);
    res.status(200).json(addChanges);
  } catch (err) {
    res.status(500).json({ err: "Error in updating translation" });
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
