const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    console.log("Login :- ", { username, password });

    try {
        let data = await User.find({ email: username });
        // console.log(data)

        if (data.length == 1) {
            const isMatch = await bcrypt.compare(password, data[0].encrypted_passord);

            if (isMatch) {
                const token = jwt.sign({ _id: data[0]._id }, process.env.JwtSecretKey, {
                    expiresIn: 36000,
                })

                res.send({
                    status: 'success',
                    msg: 'Login Successfully',
                    payload: {
                        data: {
                            token: token,
                            status: true,
                            userInfo: {
                                id: data[0]._id,
                                name: data[0].user_name,
                                role: data[0].user_role,
                                email: data[0].email,
                                contact: data[0].contact_number
                            }
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
