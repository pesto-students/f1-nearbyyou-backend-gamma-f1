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
            data: newUser,
            accessToken
        });
        console.log("user is created")
    } catch (error) {
        next(error)
    }
}
exports.addShop = async (req, res, next) => {
    const vendor_id = "615d87dba1492420b273de81";
    try {
        const { shop_email, shop_contact_number, shop_category, shop_door_number, shop_street, shop_area, shop_city_town, shop_state, shop_pincode } = req.body;
        const newShop = new shopBranch({ shop_email: shop_email, shop_contact_number: shop_contact_number, shop_category: shop_category, shop_door_number: shop_door_number, shop_street: shop_street, shop_area: shop_area, shop_city_town: shop_city_town, shop_state: shop_state, shop_pincode: shop_pincode, shop_owner: vendor_id });
        await newShop.save();
        res.json({
            data: newShop,
        });
        console.log("newShop is created");
    }
    catch (error) {
        next(error);
    }
}

exports.editShop = async (req, res, next) => {
    const vendor_id = "615d87dba1492420b273de81";
    const { shop_email, shop_contact_number, shop_category, shop_door_number, shop_street, shop_area, shop_city_town, shop_state, shop_pincode } = req.body;
    const updateShopFields = {}
    if (shop_email) updateShopFields.shop_email = shop_email;
    if (shop_contact_number) updateShopFields.shop_contact_number = shop_contact_number;
    if (shop_category) updateShopFields.shop_category = shop_category;
    if (shop_door_number) updateShopFields.shop_door_number = shop_door_number;
    if (shop_street) updateShopFields.shop_street = shop_street;
    if (shop_area) updateShopFields.shop_area = shop_area;
    if (shop_city_town) updateShopFields.shop_city_town = shop_city_town;
    if (shop_state) updateShopFields.shop_state = shop_state;
    if (shop_pincode) updateShopFields.shop_pincode = shop_pincode;

    try {
        let shopbrnachdetails = await shopBranch.findById(req.params.id);
        if (!shopbrnachdetails) {
            res.status(404).json({ msg: "shop brnach not found" })
        }
        updatedShopDetails = await shopBranch.findByIdAndUpdate(req.params.id, { $set: updateShopFields }, { new: true });
        res.json({
            data: updatedShopDetails,
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error");
    }
}


exports.deleteShop = async (req, res) => {
    try {
        let shop = await shopBranch.findById(req.params.id);
        if (!shop) {
            res.status(404).json({ msg: "shop not found" })
        }

        shop = await shopBranch.findByIdAndRemove(req.params.id);
        res.json({ msg: "shop removed " })
    } catch (err) {

        console.error(err.message);
        res.status(500).send("server error");
    }
}

