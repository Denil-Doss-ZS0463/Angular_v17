
const db = require('../config/database');

class UserAccessLevel {
    static getAll(callback) {
        db.query('SELECT * FROM user_access_level', (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }
}

module.exports = UserAccessLevel;
