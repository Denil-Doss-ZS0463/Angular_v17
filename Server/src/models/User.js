const db = require("../config/database");

class User {
    static getAll(callback) {
        db.query("SELECT * FROM users", (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static getByEmailAndPassword(email, password, callback) {
        db.query('SELECT * FROM users WHERE emailId = $1 AND password = $2', [email, password], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return callback(err, null);
            }
            const user = result.rows[0];
            if (!user) {
                return callback('User not found', null);
            }
            callback(null, user);
        });
    }
}

module.exports = User;
