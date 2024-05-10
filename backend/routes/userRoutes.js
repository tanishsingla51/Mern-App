const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// create a user
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json("User created successfully" + userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const gettingAllUsers = await User.find();
    res.status(200).json(gettingAllUsers);
  } catch (error) {
    console.log(error);
  }
});

// get a single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json("User deleted successfully" + deleteUser);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
