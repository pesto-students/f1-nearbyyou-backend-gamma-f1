const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const shopBranch = require('../Schema/ShopBranch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

exports.signup = async (req, res, next) => {
    console.log("signup is called")
    try {
        const { user_name, email, password, role, contact_number } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ user_name: user_name, email: email, encrypted_passord: hashedPassword, user_role: role || "customer", contact_number: contact_number });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            status: "success",
            message: "added new user",
            payload: {
                data: newUser,
                accessToken: accessToken
            }
        });
        console.log("user is created")
    } catch (error) {
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: "server error"
            }
        });
    }
}
