const jwt = require("jsonwebtoken");
const User = require('../Schema/User');

const { getAuth } = require('firebase-admin/auth')
const admin = require("firebase-admin");

const serviceAccount = require("../googleServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


module.exports = async function (req, res, next) {
    const header_for_token = req.header('g-auth-token') ? true : false;

    let token = "";
    if (header_for_token) {
        token = req.header('g-auth-token');
    } else {
        token = req.header('x-auth-token');
    }

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
        if (header_for_token) {
            getAuth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    const uid = decodedToken.uid;
                    User.find({ email: decodedToken.email })
                        .then((user) => {
                            console.log("user details==>", user)
                            req.user_id = user[0]._id;
                            req.user_role = user[0].user_role;
                            next()
                        })
                })
                .catch((error) => {
                    return res.send({
                        status: 'failure',
                        msg: 'Please login again !!',
                        payload: {
                            error: 'Token Expire'
                        }
                    })
                });
        } else {
            try {
                const decoded = jwt.verify(token, process.env.JwtSecretKey);
                const user = await User.findById(decoded._id);
                req.user_id = decoded._id
                req.user_role = user.user_role;
                next()
            } catch (error) {
                return res.send({
                    status: 'failure',
                    msg: 'Invalid Token, Authorization Denied !!',
                    payload: {
                        error: 'Token Expire'
                    }
                })
            }
        }
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