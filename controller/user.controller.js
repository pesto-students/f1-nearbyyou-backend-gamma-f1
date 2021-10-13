const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}


exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log("Login :- ", { username, password });
    try {

        let has = await hashPassword(password);
        console.log("has :- ", has);

        // let data = await User.find({ $and: [{ email:   }, { encrypted_passord: await hashPassword(password) }] });

        let data = await User.find({ email: username });
        console.log(data)

        console.log("Data :- ", data);

        if (data.length == 1) {
            console.log("process.env.JwtSecretKey", process.env.JwtSecretKey);
            const token = jwt.sign({ _id: data[0]._id }, process.env.JwtSecretKey, {
                expiresIn: 36000,
            })

            res.send({
                status: 'success',
                msg: 'Login Successfully',
                payload: {
                    data: {
                        token: token,
                        status: true
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Invalid Username or Password !!',
                payload: {
                    error: 'Login Fail'
                }
            })
        }

    } catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: error.message
            }
        })
    }

}
