const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

// POST route for user signup
router.post("/signup", authController.signup);

// POST route for user login
router.post("/login", authController.login);

// GET route to fetch all users
router.get("/list", adminController.getAllUsers);

// DELETE route to delete a user
router.delete("/:id", adminController.deleteUser);

module.exports = router;
