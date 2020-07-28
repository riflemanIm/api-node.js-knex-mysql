import express from "express";
import promosDB from "../models/promo-model.js";
import { use } from "passport";
import multer from "multer";
const upload = multer();
const router = express.Router();

// GET ALL PROMO
router.get("/", async (req, res) => {
  try {
    const promos = await promosDB.find();
    res.status(200).json(promos);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const promoId = req.params.id;
  try {
    const promo = await promosDB.findById(promoId);
    if (!promo) {
      res
        .status(404)
        .json({ err: "The promo with the specified id does not exist" });
    } else {
      res.status(200).json(promo[0]);
    }
  } catch (err) {
    res.status({ err: "The promo information could not be retrieved" });
  }
});

// INSERT USER INTO DB
router.post("/", async (req, res) => {
  const newPromo = req.body.data;

  try {
    await promosDB.addPromo(newPromo);
    res.status(201).json("ok");
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .json({ err: "Error in adding promo", message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const promoId = req.params.id;
  const newChanges = req.body.data;

  try {
    const addChanges = await promosDB.updatePromo(promoId, newChanges);
    console.log("\n addChanges\n", promoId, addChanges);
    res.status(200).json(addChanges);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error in updating promo", message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const promoId = req.params.id;
  try {
    const deleting = await promosDB.removePromo(promoId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error in deleting promo", message: err.message });
  }
});

module.exports = router;
