const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get('/getUserById/:id', UserController.getUserById);
router.get("/getAllUsers", UserController.getAllUsers);
router.post('/addUser', UserController.addUser);
router.post('/login', UserController.login);
router.put('/updateUser/:id', UserController.updateUser);
router.patch('/updateUserStatus/:id', UserController.patchUserStatus);
module.exports = router;
