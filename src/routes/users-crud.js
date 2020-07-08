import express from "express";
import usersDB from "../models/users-model.js";
import { use } from "passport";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await usersDB.find();
    // console.log("GET ALL USERS\n\n", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await usersDB.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ err: "The user with the specified id does not exist" });
    } else {
      res.status(200).json(user[0]);
    }
  } catch (err) {
    res.status({ err: "The user information could not be retrieved" });
  }
});

// GET USER PHOTO BY ID
router.get("/photo/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await usersDB.photoById(userId);
    if (!data) {
      res
        .status(404)
        .json({ err: "The user PHOTO with the specified id does not exist" });
    } else {
      res.contentType("image/jpeg");
      res.send(data[0].photo);
    }
  } catch (err) {
    res.status({ err: "The user information could not be retrieved" });
  }
});

// INSERT USER INTO DB
router.post("/", async (req, res) => {
  const newUser = req.body;
  console.log("newUser", newUser);
  if (!newUser.name) {
    res.status(404).json({ err: "Please provide the name" });
  } else {
    try {
      const user = await usersDB.addUser(newUser);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ err: "Error in adding user" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const newChanges = req.body.data;

  if (!newChanges.first_name) {
    res.status(404).json({ err: "You are missing information" });
  } else {
    try {
      const addChanges = await usersDB.updateUser(userId, newChanges);
      console.log("addChanges", addChanges);
      res.status(200).json(addChanges);
    } catch (err) {
      res.status(500).json({ err: "Error in updating user" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleting = await usersDB.removeUser(userId);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting user" });
  }
});

module.exports = router;
