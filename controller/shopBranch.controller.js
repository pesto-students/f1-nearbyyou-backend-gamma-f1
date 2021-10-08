
exports.addShop = async (req, res, next) => {
    const vendor_id = "615d87dba1492420b273de81";
    try {
        const { shop_email, shop_contact_number, shop_category, shop_door_number, shop_street, shop_area, shop_city_town, shop_state, shop_pincode } = req.body;
        const newShop = new shopBranch({ shop_email: shop_email, shop_contact_number: shop_contact_number, shop_category: shop_category, shop_door_number: shop_door_number, shop_street: shop_street, shop_area: shop_area, shop_city_town: shop_city_town, shop_state: shop_state, shop_pincode: shop_pincode, shop_owner: vendor_id });
        await newShop.save();
        res.json({
            status: "success",
            message: "added a branch",
            payload: {
                data: newShop,
            }
        });
        console.log("newShop is created");
    }
    catch (error) {
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: "server error"
            }
        });
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
            status: "success",
            message: "updated the details of branch",
            payload: {
                data: updatedShopDetails,
            }
        });
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


exports.deleteShop = async (req, res) => {
    try {
        let shop = await shopBranch.findById(req.params.id);
        if (!shop) {
            res.json({
                status: "failure",
                message: "Shop not found",
                payload: {
                    error: "Shop not found"
                }
            });
        }

        shop = await shopBranch.findByIdAndRemove(req.params.id);
        res.json({
            status: "success",
            message: "shop removed"
        });
    } catch (err) {

        console.error(err.message);
        res.json({
            status: "failure",
            message: "server error",
            payload: {
                error: "server error"
            }
        });
    }
}

