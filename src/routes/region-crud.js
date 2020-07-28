import express from "express";
import regionsDB from "../models/region-model.js";
import { use } from "passport";
import multer from "multer";
const upload = multer();
const router = express.Router();

// GET ALL REGION
router.get("/", async (req, res) => {
  try {
    const regions = await regionsDB.find();
    res.status(200).json(regions);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const regionId = req.params.id;
  try {
    const region = await regionsDB.findById(regionId);
    if (!region) {
      res
        .status(404)
        .json({ err: "The region with the specified id does not exist" });
    } else {
      res.status(200).json(region[0]);
    }
  } catch (err) {
    res.status({ err: "The region information could not be retrieved" });
  }
});

// INSERT USER INTO DB
router.post("/", async (req, res) => {
  const newRegion = req.body.data;

  try {
    await regionsDB.addRegion(newRegion);
    res.status(201).json("ok");
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .json({ err: "Error in adding region", message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const regionId = req.params.id;
  const newChanges = req.body.data;

  try {
    const addChanges = await regionsDB.updateRegion(regionId, newChanges);
    console.log("\n addChanges\n", regionId, addChanges);
    res.status(200).json(addChanges);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error in updating region", message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const regionId = req.params.id;
  try {
    const deleting = await regionsDB.removeRegion(regionId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error in deleting region", message: err.message });
  }
});

module.exports = router;
