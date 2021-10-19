const jwt = require("jsonwebtoken");
const User = require('../Schema/User');


module.exports = async function (req, res, next) {
    console.log(req.header)
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
    }

    try {
        const decoded = jwt.verify(token, process.env.JwtSecretKey);
        const user = await User.findById(decoded._id);
        req.user_id = decoded._id
        req.user_role = user.user_role;
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