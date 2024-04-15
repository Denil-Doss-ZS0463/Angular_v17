const db = require('../config/database');

class User {
    static getAll(callback) {
        db.query(`
            SELECT u.*, ual.value AS accessLevel FROM users u JOIN user_access_level ual ON u.accessLevel = ual.id WHERE u.status = $1`, ['Active'], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static getUserById(id) {
        return db.query(`
            SELECT u.*, ual.value AS accessLevel FROM users u JOIN user_access_level ual ON u.accessLevel = ual.id WHERE u.id = $1 AND u.status = $2`, [id, 'Active'])
            .then(userResult => {
                if (userResult.rows.length === 0) {
                    throw new Error('User not found or inactive');
                }

                const user = userResult.rows[0];
                const accessLevel = user.accessLevel;

                const userWithAccessLevel = { ...user, accessLevel };

                return userWithAccessLevel;
            })
            .catch(error => {
                console.error('Error retrieving user:', error.message);
                throw error;
            });
    }

    static getByEmail(email, callback) {
        db.query(
            'SELECT * FROM users WHERE email = $1',
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
                if (user.status !== 'Active') {
                    return callback('User is inactive', null);
                }
                callback(null, user || null);
            }
        );
    }

    static addUser(userData, callback) {
        const { firstname, lastname, email, password, phonenumber, jobtitle, accesslevel, areaaccess, status } = userData;
        if (!firstname || !lastname || !email || !password || !phonenumber || !jobtitle || !accesslevel || !areaaccess) {
            console.log("Required fields are missing, Fields can't be an empty value");
            return callback('Required fields are missing', null);
        }

        db.query('SELECT * FROM users WHERE email = $1', [userData.email], (err, result) => {
            if (result.rows.length > 0) {
                console.log('User already exists');
                return callback(null);
            }
            db.query('INSERT INTO users (firstname, lastname, email, password, phonenumber, jobtitle, accesslevel, areaaccess, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
                userData.firstname,
                userData.lastname,
                userData.email,
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
        const { firstname, lastname, email, password, phonenumber, jobtitle, accesslevel, areaaccess, status } = userData;
        db.query('UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4, phonenumber = $5, jobtitle = $6, accesslevel = $7, areaaccess = $8, status = $9 WHERE id = $10 RETURNING *',
            [firstname, lastname, email, password, phonenumber, jobtitle, accesslevel, areaaccess, status, userId],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, result.rows[0]);
            });
    }

    static patchUserStatus(userId, status, callback) {
        if (status === 'Inactive') {
            db.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', ['Inactive', userId], (err, result) => {
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
