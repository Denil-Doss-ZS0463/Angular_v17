const User = require("../models/User");
const jwt = require("jsonwebtoken");
const UserDTO = require("../DTO/userDTO");
const jwtSecretKey = require("../middleware/authMiddleware").jwtSecretKey;
const bcrypt = require("bcrypt");

class UserController {
    static getAllUsers(req, res) {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            const usersResponse = users.map(user => UserDTO.userResponse(user, 'getAllUsers'));
            res.send(usersResponse);
        });
    }

    static login(req, res) {
        const { email, password } = req.body;
        User.getByEmail(email, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return;
                }
                if (result) {
                    console.log("Passwords match");
                    const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
                        expiresIn: "1hr",
                    });
                    console.log(token);
                    res.json({ token });
                } else {
                    console.log("Passwords do not match");
                }
            });
        });
    }

    static getUserById(req, res) {
        const userId = req.params.id;

        User.getUserById(userId)
            .then((user) => {
                const userResponse = UserDTO.userResponse(user, 'getUserById');
                res.json(userResponse);
            })
            .catch((error) => {
                console.error("Error retrieving user:", error.message);
                res.status(404).json({ message: "User not found" });
            });
    }

    static addUser(req, res) {
        const { firstname, lastname, email, password, phonenumber, jobtitle, accesslevel, areaaccess } = req.body;

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err.message);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            const status = 'Active';

            User.addUser({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                phonenumber,
                jobtitle,
                accesslevel,
                areaaccess,
                status
            }, (err, newUser) => {
                if (err === 'User already exists') {
                    return res.status(400).json({ message: 'User already exists' });
                }
                if (err) {
                    console.error('Error adding user:', err.message);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(201).json({ message: "User added successfully" });
            });
        });
    }

    static updateUser(req, res) {
        const userId = req.params.id;
        const { firstname, lastname, jobtitle, phonenumber, accesslevel, areaaccess, status } = req.body;
        if (!firstname || !lastname || !jobtitle || !accesslevel || !phonenumber || !areaaccess || !status) {
            return res.status(400).json({ message: 'Required Fields are missing' });
        }
        User.updateUser(userId, { firstname, lastname, jobtitle, phonenumber, accesslevel, areaaccess, status }, (err, updatedUser) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: "User updated successfully" });
        });
    }

    static patchUserStatus(req, res) {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        User.patchUserStatus(userId, 'Inactive', (err, updatedUser) => {
            if (err) {
                console.error('Error updating user status:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (!updatedUser) {
                return res.status(400).json({ message: 'Invalid or unsupported patch operation' });
            }
            res.status(200).json({ message: "User status updated successfully" });
        });
    }
}

module.exports = UserController;
