const db = require('../config/database');

class User {
    static getAll(callback) {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }
    static getUserById(id) {
        return db.query('SELECT * FROM users WHERE id = $1', [id])
            .then(result => {
                if (result.rows.length === 0) {
                    throw new Error('User not found');
                }
                return result.rows[0];
            })
            .catch(error => {
                console.error('Error retrieving user:', error.message);
                throw error;
            });
    }

    static getByEmail(email, callback) {
        db.query(
            'SELECT * FROM users WHERE emailId = $1',
            [email],
            (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return callback(err, null);
                }
                const user = result.rows[0];
                if (!user) {
                    return callback('User not found', null);
                }
                callback(null, user || null);
            }
        );
    }
    static addUser(userData, callback) {
        db.query('SELECT * FROM users WHERE emailid = $1', [userData.emailid], (err, result) => {
            if (result.rows.length > 0) {
                console.log('User already exists');
                return callback(null);
            }
            db.query('INSERT INTO users (firstname, lastname, emailid, password, phonenumber, jobtitle, accesslevel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
                userData.firstname,
                userData.lastname,
                userData.emailid,
                userData.password,
                userData.phonenumber,
                userData.jobtitle,
                userData.accesslevel
            ], (insertErr, result) => {
                if (insertErr) {
                    return callback(insertErr, null);
                }
                callback(null, result.rows[0]);
            });
        });
    }
}

module.exports = User;