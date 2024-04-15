const UserAccessLevel = require('../models/userAccessLevelModel');

const getAllUserAccessLevels = (req, res) => {
    UserAccessLevel.getAll((err, userAccessLevels) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(userAccessLevels);
        }
    });
};

module.exports = { getAllUserAccessLevels };
