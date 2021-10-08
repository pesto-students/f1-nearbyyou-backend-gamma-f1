const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

//Sign Up
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
        const data = newUser.save();
        if (data) {
            res.send({
                status: 'success',
                msg: 'Register Successfully, Please Login',
                payload: {
                    data: 'Register Success'
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Regiser Fail'
                }
            })
        }


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

//Login
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log("Login :- ", { username, password });
    console.log("Login :- ", { username, password });
    try {

        let has = await hashPassword(password);
        console.log("has :- ", has);

        // let data = await User.find({ $and: [{ email: username }, { encrypted_passord: await hashPassword(password) }] });

        let data = await User.find({ email: username });

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
                error: 'Server Error'
            }
        })
    }

}

//Search
exports.search = async (req, res, next) => {
    console.log("req.body :- ", req.body);
    res.send({
        status: 'success',
        msg: 'Search Successfully!!',
        payload: {
            data: {
                data: 'Search Success'
            }
        }
    })
}

//Category
exports.category = async (req, res, next) => {
    console.log("req.body :- ", req.body);
    res.send({
        status: 'success',
        msg: 'Category Successfully!!',
        payload: {
            data: {
                data: 'Category Success'
            }
        }
    })
}
