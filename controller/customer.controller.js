const User = require('../Schema/User');
const Category = require('../Schema/Category');
const ShopBranch = require('../Schema/ShopBranch')
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

//Search
exports.search = async (req, res, next) => {
    console.log("req.body :- ", req.body);
    const { freeText, pincode, category } = req.body;
    
    let data = await ShopBranch.find({shop_pincode :  35017 });

    console.log("data :- ", data);

    res.send({
        status: 'success',
        msg: 'Search Successfully!!',
        payload: {
            data: {
                data: data
            }
        }
    })

    // const shopData = {
    //     shop_name : 'Uma Ele',
    //     shop_email : 'uma@gmail.com',
    //     shop_contact_number : '1122554477',
    //     shop_door_number : '123',
    //     shop_street :  'althan',
    //     shop_area : 'althan',
    //     shop_city_town : 'surat',
    //     shop_state :'Gujarat',
    //     shop_pincode:  '35018  ',
    //     shop_category :'6161bbc1c2822a52d76cbb3b',
    //     shop_owner : '6161bbc1c2822a52d76cbb3b',
    //     status: true,          
    // }

    // const newShop = new shopBranch(shopData);
    // const data = newShop.save();

    // if (data) {
    //     res.send({
    //         status: 'success',
    //         msg: 'Category Add Successfully',
    //         payload: {
    //             data: 'shop add done'
    //         }
    //     })
    // } else {
    //     res.send({
    //         status: 'failure',
    //         msg: 'Something is Wrong, Plese Try Again !!',
    //         payload: {
    //             error: 'shop add Fail'
    //         }
    //     })
    // }


    //----------------------------------------

    // const CategoryData = {
    //     name : 'electric',
    //     status : true
    // }

    // const newCategory = new Category(CategoryData);
    // const data = newCategory.save();

    // if (data) {
    //     res.send({
    //         status: 'success',
    //         msg: 'Category Add Successfully',
    //         payload: {
    //             data: 'category add done'
    //         }
    //     })
    // } else {
    //     res.send({
    //         status: 'failure',
    //         msg: 'Something is Wrong, Plese Try Again !!',
    //         payload: {
    //             error: 'Regiser Fail'
    //         }
    //     })
    // }

}

//Category
exports.category = async (req, res, next) => {
    const { type, selectCategory } = req.body;

    let categoryList = await Category.find({});

    let data = ''
    if (selectCategory && selectCategory != '') {
        data = await Category.find({ _id: selectCategory });
    } else {
        data = await Category.find({});
    }

    res.send({
        status: 'success',
        msg: 'Category Successfully!!',
        payload: {
            data: {
                data: data,
                avaliableCategory: categoryList
            }
        }
    })
}

//Detail
exports.detail = async (req, res, next) => {
    console.log("req.body details :- ", req.body);
    const { shopId } = req.body;
    
    let data = await ShopBranch.find({_id :  shopId });

    console.log("Details data :- ", data);

    res.send({
        status: 'success',
        msg: 'Search Successfully!!',
        payload: {
            data: {
                data: data
            }
        }
    })

    // const shopData = {
    //     shop_name : 'Uma Ele',
    //     shop_email : 'uma@gmail.com',
    //     shop_contact_number : '1122554477',
    //     shop_door_number : '123',
    //     shop_street :  'althan',
    //     shop_area : 'althan',
    //     shop_city_town : 'surat',
    //     shop_state :'Gujarat',
    //     shop_pincode:  '35018  ',
    //     shop_category :'6161bbc1c2822a52d76cbb3b',
    //     shop_owner : '6161bbc1c2822a52d76cbb3b',
    //     status: true,          
    // }

    // const newShop = new shopBranch(shopData);
    // const data = newShop.save();

    // if (data) {
    //     res.send({
    //         status: 'success',
    //         msg: 'Category Add Successfully',
    //         payload: {
    //             data: 'shop add done'
    //         }
    //     })
    // } else {
    //     res.send({
    //         status: 'failure',
    //         msg: 'Something is Wrong, Plese Try Again !!',
    //         payload: {
    //             error: 'shop add Fail'
    //         }
    //     })
    // }


    //----------------------------------------

    // const CategoryData = {
    //     name : 'electric',
    //     status : true
    // }

    // const newCategory = new Category(CategoryData);
    // const data = newCategory.save();

    // if (data) {
    //     res.send({
    //         status: 'success',
    //         msg: 'Category Add Successfully',
    //         payload: {
    //             data: 'category add done'
    //         }
    //     })
    // } else {
    //     res.send({
    //         status: 'failure',
    //         msg: 'Something is Wrong, Plese Try Again !!',
    //         payload: {
    //             error: 'Regiser Fail'
    //         }
    //     })
    // }

}

//add ticket
exports.ticket = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);

    res.send({
        status: 'success',
        msg: 'Ticket Add Successfully!!',
        payload: {
            data: {
                data: 'Ticket Add',
            }
        }
    })
}

//View ticket
exports.viewTicket = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);

    res.send({
        status: 'success',
        msg: 'Ticket View Successfully!!',
        payload: {
            data: {
                data: 'Ticket View',
            }
        }
    })
}

