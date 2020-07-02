import express from "express";
import usersDB from "../models/clinic-model.js";
import { use } from "passport";

const router = express.Router();

// GET ALL CLINICS
router.get("/", async (req, res) => {
  try {
    const data = await usersDB.find();
    // console.log("GET ALL USERS\n\n", users);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// // GET USER BY ID
// router.get("/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await usersDB.findById(userId);
//     if (!user) {
//       res
//         .status(404)
//         .json({ err: "The user with the specified id does not exist" });
//     } else {
//       res.status(200).json(user);
//     }
//   } catch (err) {
//     res.status({ err: "The user information could not be retrieved" });
//   }
// });

// // INSERT USER INTO DB
// router.post("/", async (req, res) => {
//   const newUser = req.body;
//   console.log("newUser", newUser);
//   if (!newUser.name) {
//     res.status(404).json({ err: "Please provide the name" });
//   } else {
//     try {
//       const user = await usersDB.addUser(newUser);
//       res.status(201).json(user);
//     } catch (err) {
//       res.status(500).json({ err: "Error in adding user" });
//     }
//   }
// });

// router.put("/:id", async (req, res) => {
//   const userId = req.params.id;
//   const newChanges = req.body;
//   if (!newChanges.name) {
//     res.status(404).json({ err: "You are missing information" });
//   } else {
//     try {
//       const addChanges = await usersDB.updateUser(userId, newChanges);
//       res.status(200).json(addChanges);
//     } catch (err) {
//       res.status(500).json({ err: "Error in updating user" });
//     }
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const deleting = await usersDB.removeUser(userId);
//     res.status(204).json(deleting);
//   } catch (err) {
//     res.status(500).json({ err: "Error in deleting user" });
//   }
// });

module.exports = router;
