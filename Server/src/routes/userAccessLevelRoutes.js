const express = require('express');
const router = express.Router();
const userAccessLevelController = require('../controllers/userAccessLevelController');

router.get('/user-access-levels', userAccessLevelController.getAllUserAccessLevels);

module.exports = router;
