const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    console.log("Login :- ", { username, password });

    try {

        let data = await User.find({ email: username });
        // console.log(data)

        // let data = await User.find({ email: username });



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
                                data: data
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



exports.glogin = async (req, res) => {
    const { username } = req.body;

    console.log("google Login :- ", { username });

    try {

        let udata = await User.find({ email: username });
        console.log("in backend->", udata.length)
        console.log("user data in google auth==>", udata)
        // let data = await User.find({ email: username });
        if (udata.length == 0) {
            res.send({
                status: 'failure',
                msg: 'user not found',
                payload: {
                    error: 'user not found'
                }
            });
            console.log("user not found")
        }
        else {
            res.send({
                status: 'success',
                msg: 'Login Successfully',
                payload: {
                    data: {
                        userInfo: {
                            data: udata
                        }
                    }
                }
            });
            console.log("successfull")
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


