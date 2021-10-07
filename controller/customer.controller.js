const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

exports.signup = async (req, res, next) => {
    try {
        const { user_name, user_role, email, contact_number, password } = req.body;

        const signUpData = {
            user_name: user_name,
            user_role: user_role,
            email: email,
            contact_number: contact_number,
            encrypted_passord: await hashPassword(password),
            status: true
        }

        const newUser = new User(signUpData);
        newUser.save(function (err) {
            if (err) {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !!',
                    payload: {
                        error: 'Regiser Fail'
                    }
                })
            } else {
                res.send({
                    status: 'success',
                    msg: 'Register Successfully, Please Login',
                    payload: {
                        data: 'Register Success'
                    }
                })
            }
        })

    } catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // User.find({ $and: [{ email: username }, { contact_number: 'contact_number' }] }, function (err, data) {
        User.find({ email: '16mscit115@gmail.com' }, function (err, data) {
            if (err) {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !!',
                    payload: {
                        error: 'Login Fail'
                    }
                })
            } else {
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
                        msg: 'Invalid Username Or Password',
                        payload: {
                            error: 'Invalid Login'
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }

}

exports.search = async (req, res, next) => {
    console.log("req.body :- ", req.body);
}




// res.json({
//     status: "failure",
//     message: "parameters not found",
    // payload: {
    //     error: extractedErrors
    // }
// });

// res.json({
//     status: "success",
//     message: "status of the ticket has been updated successfully",
//     payload: {
//         data: updated_ticket
//     }
// });