import express from "express";
import usersDB from "../models/user-model.js";
import { use } from "passport";
import multer from "multer";
const upload = multer();
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
    if (!data || data.length === 0) {
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
  const newUser = req.body.data;
  console.log("newUser", newUser);

  if (!newUser.username) {
    res.status(404).json({ err: "Please provide the username" });
  } else {
    try {
      const username = await usersDB.findUsername(newUser.username);
      console.log("\n\n\n username '" + username + "' \n\n\n");
      if (!username) {
        const user = await usersDB.addUser(newUser);
        console.log("\n\n\n addUser '" + user + "' \n\n\n");
        res.status(201).json(user);
      } else {
        res.status(400).json({ err: "Error username already exists" });
      }
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
      console.log("\n\n ---  \n\n\n");
      const usernameElse = await usersDB.findUsernameNotCurUser(
        userId,
        newChanges.username
      );
      console.log("\n\n\n usernameElse '" + usernameElse + "' \n\n\n");
      if (!usernameElse) {
        const addChanges = await usersDB.updateUser(userId, newChanges);
        console.log("addChanges", addChanges);
        res.status(200).json(addChanges);
      } else {
        res.status(400).json({ err: "Error username already exists" });
      }
    } catch (err) {
      res.status(500).json({ err: "Error in updating user" });
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
      const userId = req.params.id;
      console.log("\n ------- saveUserAvatar ------\n");
      await usersDB.saveUserAvatar(userId, buffer);
      //send response
      res.send({ status: "ok", filename });
    }
  } catch (err) {
    res.status(500).json({ err: "Error uploading file " });
  }
});

router.delete("/upload-avatar/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleting = await usersDB.removeUserAvatar(userId);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error deleting user avatar " });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleting = await usersDB.removeUser(userId);
    console.log("deleting \n", deleting);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting user" });
  }
});

module.exports = router;
