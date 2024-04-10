const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")

router.get('/getUserById/:id', UserController.getUserById);
router.get("/getAllUsers", UserController.getAllUsers);
router.post('/addUser', UserController.addUser);
router.post("/login", UserController.login);

module.exports = router;
