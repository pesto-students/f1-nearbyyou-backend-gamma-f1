const User = require('../Schema/User');
const Category = require('../Schema/Category');
const ShopBranch = require('../Schema/ShopBranch');
const Ticket = require('../Schema/Ticket')
const Customer = require('../Schema/Customer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

//Sign Up
exports.signup = async (req, res, next) => {
    console.log("req.body :- ", req.body);
    try {
        const { user_name, user_role, email, contact_number, door_number, street, area, pincode, city, state, password } = req.body;

        const signUpData = {
            user_name: user_name,
            user_role: user_role,
            email: email,
            contact_number: contact_number,
            encrypted_passord: await hashPassword(password),
            status: true
        }

        const newUser = new User(signUpData);
        await newUser.save()
            .then(data => {
                console.log("In first data :- ", data);
                const newCustomer = new Customer({ door_number: door_number, street: street, area: area, city_town: city, state: state, pincode: pincode, status: true, user_type: newUser._id });
                console.log("newCustomer :- ", newCustomer)
                newCustomer.save()
                    .then(data => {
                        console.log("In second data :- ", data);
                        res.send({
                            status: "success",
                            msg: "successfully registered please login",
                            payload: {
                                data: 'register success',
                            }
                        });
                    })
                    .catch(error => {
                        console.log("In second catch :- ", error);
                        res.send({
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
                console.log("In first catch :- ", error);
                res.json({
                    status: "failure",
                    message: "server error",
                    payload: {
                        error: "server error"
                    }
                });
            })

        // console.log("Data :- ", data);

        // if (data) {
        //     res.send({
        //         status: 'success',
        //         msg: 'Register Successfully, Please Login',
        //         payload: {
        //             data: 'Register Success'
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
    try {
        const { freeText, pincode, category } = req.body;

        let data = await ShopBranch.find({ shop_category: category });

        // let data = await ShopBranch.find({ $and: [ { shop_category: category }, { shop_pincode: pincode }] });

        console.log("data :- ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: 'Search Successfully!!',
                payload: {
                    data: {
                        data: data
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'search Fail'
                }
            })
        }
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
    console.log("req.body :- ", req.body);


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
    try {
        const { type, selectCategory } = req.body;

        let categoryList = await Category.find({});

        let data = ''
        if (selectCategory && selectCategory != '') {
            data = await Category.find({ _id: selectCategory });
        } else {
            data = await Category.find({});
        }

        if (data) {
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
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Category Search Fail'
                }
            })
        }
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Detail
exports.detail = async (req, res, next) => {
    console.log("req.body details :- ", req.body);
    try {
        const { shopId } = req.body;

        let data = await ShopBranch.find({ _id: shopId });

        console.log("Details data :- ", data);
        if (data) {
            res.send({
                status: 'success',
                msg: 'Search Successfully!!',
                payload: {
                    data: {
                        data: data
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Details Shop Fail'
                }
            })
        }
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//add ticket
exports.ticket = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);
    try {

        const { description, date, time, customerId } = req.body;

        const ticket = {
            ticket_number: customerId,
            service_description: description,
            service_date: date,
            service_time: time,
            ticket_status: 'pending',
            ticket_owner: customerId,
            shop_ticket: customerId
        }

        const newTicket = new Ticket(ticket);
        const data = await newTicket.save();

        if (data) {
            res.send({
                status: 'success',
                msg: 'Ticket Add Successfully!!',
                payload: {
                    data: {
                        data: 'Ticket Add',
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Error in Generate Ticket !!',
                payload: {
                    data: {
                        data: 'Ticket Generate Error',
                    }
                }
            })
        }


    }
    catch (error) {
        console.log("Rttot :- ", error);
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//View ticket
exports.viewTicket = async (req, res, next) => {
    console.log("Viw Ticket :- ", req.body);

    try {
        let data = await User.find({ ticket_owner: req.body.custID });

        if (data) {
            res.send({
                status: 'success',
                msg: 'View Ticket Successfully!!',
                payload: {
                    data: {
                        data: data,
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'View Ticket Fail'
                }
            })
        }

    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//get user details
exports.userDetails = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);

    try {
        let data = await User.find({ _id: req.body.userID });

        console.log("User Data :- ", data)

        if (data) {
            res.send({
                status: 'success',
                msg: 'Customer View Details Successfully!!',
                payload: {
                    data: {
                        data: data,
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'User Details Fail'
                }
            })
        }

    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Edit Profile
exports.profileEdit = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);
    try {
        res.send({
            status: 'success',
            msg: 'Profile Update Successfully!!',
            payload: {
                data: {
                    data: 'Profile Edit Success',
                }
            }
        })
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

