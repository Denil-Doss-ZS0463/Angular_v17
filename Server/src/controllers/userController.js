const User = require("../models/User");

class UserController {
    static getAllUsers(req, res) {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            res.send(users);
        });
    }

    static login(req, res) {
        const { email, password } = req.body;
        User.getByEmailAndPassword(email, password, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            res.json(user);
        });
    }
}

module.exports = UserController;
