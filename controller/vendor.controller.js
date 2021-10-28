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
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: "server error"
            }
        });
    }
}



exports.editProfile = async (req, res) => {
    console.log("edit profile is called", req.params)
    const { shop_name, email, contact_number } = req.body;
    console.log("baoyd in editinf LEOQBEV=>",req.body)
    try {
        console.log("going inside try ")
        let vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            console.log("ereeljvduv")
            res.json({
                status: "failure",
                message: "Deatils not found",
                payload: {
                    error: "Deatils not found"
                }
            });
        }
        const user_details = await User.findById(vendor.user_id)
        console.log("vendor ddeatils==>",vendor)
        console.log("user details ===>",user_details)
        const vendor_update= await Vendor.findByIdAndUpdate(req.params.id, { $set: {shop_name: shop_name} }, { new: true });
            // console.log("shop name edited")
        const user_update = await User.findByIdAndUpdate(vendor.user_id, { $set: { email: email, contact_number: contact_number } }, { new: true });
        console.log("eiufbwefgQGIRGB;qig=========>", vendor_update,user_update)
        res.json({
            status: "success",
            message: "successfully updated the profile",
            payload: {
                data: "successfully updated the profile"
            }
        });


    } catch (error) {
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: error
            }
        });
    }
}