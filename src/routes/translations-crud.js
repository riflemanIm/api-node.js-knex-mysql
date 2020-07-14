import express from "express";
import translationsDB from "../models/translations-model";
import { use } from "passport";
import multer from "multer";
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
      res.status(200).json(translation[0]);
    }
  } catch (err) {
    res.status({ err: "The translation information could not be retrieved" });
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
