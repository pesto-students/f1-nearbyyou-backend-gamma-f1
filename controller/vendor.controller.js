const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const Category = require('../Schema/Category');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

exports.signup = async (req, res, next) => {
    console.log("signup is called")
    try {
        const { user_name, email, password, role, contact_number, vendor_category, shop_name } = req.body;
        const category_selected = await Category.find({ name: vendor_category });
        const category_id = category_selected[0]._id;
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ user_name: user_name, email: email, encrypted_passord: hashedPassword, user_role: role || "customer", contact_number: contact_number });

        await newUser.save()
            .then(data => {
                const new_vendor = new Vendor({ shop_name: shop_name, vendor_category: category_id, user_id: newUser._id });
                console.log(new_vendor)
                new_vendor.save()
                    .then(data => {
                        res.json({
                            status: "success",
                            msg: "successfully registered please login",
                            payload: {
                                data: { ...newUser, ...new_vendor },
                            }
                        });
                    })
                    .catch(error => {
                        res.json({
                            status: "failure",
                            msg: "server error",
                            payload: {
                                error: "server error"
                            }
                        });
                    })

                console.log("user is created")
            })
            .catch(error => {
                res.json({
                    status: "failure",
                    msg: "server error",
                    payload: {
                        error: "server error"
                    }
                });
            })
    } catch (error) {
        console.log(error)
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: "server error"
            }
        });
    }
}
