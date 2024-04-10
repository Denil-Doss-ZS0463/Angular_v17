const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecretKey = crypto.randomBytes(64).toString('hex');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log("Received token:", token);
    if (!token) {
        console.error("Authorization header is missing");
        return res.status(400).json({ message: 'Authorization header is missing.' });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = { verifyToken, jwtSecretKey };
