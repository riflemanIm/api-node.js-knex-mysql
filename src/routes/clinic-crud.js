import express from "express";
import clinicsDB from "../models/clinic-model.js";
import { use } from "passport";
import multer from "multer";
const upload = multer();
const router = express.Router();

// GET ALL CLINICS
router.get("/", async (req, res) => {
  try {
    const clinics = await clinicsDB.find();
    // console.log("GET ALL CLINICS\n\n", clinics);
    res.status(200).json(clinics);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// GET CLINIC BY ID
router.get("/:id", async (req, res) => {
  const clinicId = req.params.id;
  try {
    const clinic = await clinicsDB.findById(clinicId);
    if (!clinic) {
      res
        .status(404)
        .json({ err: "The clinic with the specified id does not exist" });
    } else {
      res.status(200).json(clinic[0]);
    }
  } catch (err) {
    res.status({ err: "The clinic information could not be retrieved" });
  }
});

// GET CLINIC PHOTO BY ID
router.get("/photo/:id", async (req, res) => {
  const clinicId = req.params.id;
  try {
    const data = await clinicsDB.photoById(clinicId);
    if (!data || data.length === 0) {
      res
        .status(404)
        .json({ err: "The clinic PHOTO with the specified id does not exist" });
    } else {
      res.contentType("image/jpeg");
      res.send(data[0].photo);
    }
  } catch (err) {
    res.status({ err: "The clinic information could not be retrieved" });
  }
});

// INSERT CLINIC INTO DB
router.post("/", async (req, res) => {
  const newClinic = req.body.data;
  console.log("newClinic", newClinic);

  if (!newClinic.clinicname) {
    res.status(404).json({ err: "Please provide the clinicname" });
  } else {
    try {
      const clinicname = await clinicsDB.findClinicname(newClinic.clinicname);
      console.log("\n\n\n clinicname '" + clinicname + "' \n\n\n");
      if (!clinicname) {
        const clinic = await clinicsDB.addClinic(newClinic);
        console.log("\n\n\n addClinic '" + clinic + "' \n\n\n");
        res.status(201).json(clinic);
      } else {
        res.status(400).json({ err: "Error clinicname already exists" });
      }
    } catch (err) {
      res.status(500).json({ err: "Error in adding clinic" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const clinicId = req.params.id;
  const newChanges = req.body.data;

  if (!newChanges.first_name) {
    res.status(404).json({ err: "You are missing information" });
  } else {
    try {
      console.log("\n\n ---  \n\n\n");
      const clinicnameElse = await clinicsDB.findClinicnameNotCurClinic(
        clinicId,
        newChanges.clinicname
      );
      console.log("\n\n\n clinicnameElse '" + clinicnameElse + "' \n\n\n");
      if (!clinicnameElse) {
        const addChanges = await clinicsDB.updateClinic(clinicId, newChanges);
        console.log("addChanges", addChanges);
        res.status(200).json(addChanges);
      } else {
        res.status(400).json({ err: "Error clinicname already exists" });
      }
    } catch (err) {
      res.status(500).json({ err: "Error in updating clinic" });
    }
  }
});

router.put("/upload-avatar/:id", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const { buffer } = req.file;
      const { filename } = req.body;
      const clinicId = req.params.id;
      console.log("\n ------- saveClinicAvatar ------\n");
      await clinicsDB.saveClinicAvatar(clinicId, buffer);
      //send response
      res.send({ status: "ok", filename });
    }
  } catch (err) {
    res.status(500).json({ err: "Error uploading file " });
  }
});

router.delete("/upload-avatar/:id", async (req, res) => {
  const clinicId = req.params.id;
  try {
    const deleting = await clinicsDB.removeClinicAvatar(clinicId);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error deleting clinic avatar " });
  }
});

router.delete("/:id", async (req, res) => {
  const clinicId = req.params.id;
  try {
    const deleting = await clinicsDB.removeClinic(clinicId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting clinic" });
  }
});

module.exports = router;
