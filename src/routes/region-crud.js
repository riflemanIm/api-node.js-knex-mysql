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
    // console.log("GET ALL REGION\n\n", regions);
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
  console.log("newRegion", newRegion);
  try {
    region = await regionsDB.addRegion(newRegion);
    console.log("\n\n\n addRegion '" + region + "' \n\n\n");
    res.status(201).json(region);
  } catch (err) {
    res.status(500).json({ err: "Error in adding region" });
  }
});

router.put("/:id", async (req, res) => {
  const regionId = req.params.id;
  const newChanges = req.body.data;

  try {
    console.log("\n\n\n regionnameElse '" + newChanges + "' \n\n\n");
    const addChanges = await regionsDB.updateRegion(regionId, newChanges);
    console.log("\n addChanges\n", addChanges);
    res.status(200).json(addChanges);
  } catch (err) {
    res.status(500).json({ err: "Error in updating region" });
  }
});

router.delete("/:id", async (req, res) => {
  const regionId = req.params.id;
  try {
    const deleting = await regionsDB.removeRegion(regionId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting region" });
  }
});

module.exports = router;
