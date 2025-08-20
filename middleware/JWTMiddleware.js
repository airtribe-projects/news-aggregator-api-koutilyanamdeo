const jwt = require('jsonwebtoken');
const { secretKey } = require('../constant');

// JWT Verification Middleware
const authenticateToken = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    // email should be in string format
    console.log(res);
    if (typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Invalid token format'
        });
    }   
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required' 
        });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }

        // Attach user info to request object
        req.user = decoded;
        next(); // Continue to the next middleware/route
    });
};

module.exports = { authenticateToken };
