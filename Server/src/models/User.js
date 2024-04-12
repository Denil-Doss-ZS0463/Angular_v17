const db = require('../config/database');

class User {
    static getAll(callback) {
        db.query('SELECT * FROM users WHERE status = $1', ['active'], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static getUserById(id) {
        return db.query('SELECT * FROM users WHERE id = $1 AND status = $2', [id, 'active'])
            .then(result => {
                if (result.rows.length === 0) {
                    throw new Error('User not found or inactive');
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
                // Check if the user is active
                if (user.status !== 'active') {
                    return callback('User is inactive', null);
                }
                callback(null, user || null);
            }
        );
    }

    static addUser(userData, callback) {
        const { firstname, lastname, emailid, password, phonenumber, jobtitle, accesslevel, areaaccess, status } = userData;
        if (!firstname || !lastname || !emailid || !password || !phonenumber || !jobtitle || !accesslevel || !areaaccess) {
            console.log("Required fields are missing, Fields can't be an empty value");
            return callback('Required fields are missing', null);
        }

        db.query('SELECT * FROM users WHERE emailid = $1', [userData.emailid], (err, result) => {
            if (result.rows.length > 0) {
                console.log('User already exists');
                return callback(null);
            }
            db.query('INSERT INTO users (firstname, lastname, emailid, password, phonenumber, jobtitle, accesslevel, areaaccess, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
                userData.firstname,
                userData.lastname,
                userData.emailid,
                userData.password,
                userData.phonenumber,
                userData.jobtitle,
                userData.accesslevel,
                userData.areaaccess,
                status
            ], (insertErr, result) => {
                if (insertErr) {
                    return callback(insertErr, null);
                }
                callback(null, result.rows[0]);
            });
        });
    }

    static updateUser(userId, userData, callback) {
        const { firstname, lastname, emailid, password, phonenumber, jobtitle, accesslevel, areaaccess, status } = userData;
        db.query('UPDATE users SET firstname = $1, lastname = $2, emailid = $3, password = $4, phonenumber = $5, jobtitle = $6, accesslevel = $7, areaaccess = $8, status = $9 WHERE id = $10 RETURNING *',
            [firstname, lastname, emailid, password, phonenumber, jobtitle, accesslevel, areaaccess, status, userId],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, result.rows[0]);
            });
    }

    static patchUserStatus(userId, status, callback) {
        if (status === 'inactive') {
            db.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', ['inactive', userId], (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, result.rows[0]);
            });
        } else {
            callback(null, null); 
        }
    }
}

module.exports = User;
