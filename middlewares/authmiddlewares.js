const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "Authorization header not found" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token not found" });

    console.log(token)

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token not valid" });
    }
};

module.exports = auth;
