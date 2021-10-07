const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    console.log('token :- ', token);

    if (!token) {
        return res.send({
            status: 'failure',
            msg: 'No Token, Authorization Denied !!',
            payload: {
                error: 'Token Not Avaliable'
            }
        })
        // return res.status(401).json({ msg: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JwtSecretKey);
        // req.user = decoded.user;
        conosle.log("decoded.user: - ", decoded.user);
        next()
    } catch (err) {
        console.error(err.message);
        return res.send({
            status: 'failure',
            msg: 'Invalid Token, Authorization Denied !!',
            payload: {
                error: 'Token Expire'
            }
        })
        // return res.status(401).json({ msg: "Invalid token, authorization denied" })
    }
}