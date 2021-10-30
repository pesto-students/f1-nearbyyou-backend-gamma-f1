const User = require('../Schema/User');
const Category = require('../Schema/Category');
const ShopBranch = require('../Schema/ShopBranch');
const Ticket = require('../Schema/Ticket')
const Customer = require('../Schema/Customer');
const Vendor = require('../Schema/vendor');
const FeedBack = require('../Schema/FeedBack');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const crypto = require('crypto')
const utils = require('./uplodImage')

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

        // let data = await ShopBranch.find({ shop_category: category });

        let query = []

        if (pincode) {
            query.push({ shop_pincode: pincode })
        }
        if (category) {
            query.push({ shop_category: category })
        }
        if (freeText) {
            query.push({ shop_name: freeText })
        }
        console.log("quesry :- ", query);
        let data = await ShopBranch.find({ $and: query });

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

    // const vendorData = {
    //     shop_name: "Hair Look",
    //     status: true,
    //     user_id: '6169d7e0d1c161bfc55d0cd1',
    // }

    // const newVendor = new Vendor(vendorData);
    // const data = newVendor.save();

    // if (data) {
    //     res.send({
    //         status: 'success',
    //         msg: 'vnedor add successfully',
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


    // const shopData = {
    //     shop_name : 'Buty Salon',
    //     shop_email : 'buty@gmail.com',
    //     shop_contact_number : '8855447799',
    //     shop_door_number : '321',
    //     shop_street :  'Pandeshra',
    //     shop_area : 'Pandeshra',
    //     shop_city_town : 'surat',
    //     shop_state :'Gujarat',
    //     shop_pincode:  '35018  ',
    //     shop_category :'6161bb8c56daf3425b39ae5f',
    //     shop_owner : '6161bb8c56daf3425b39ae5f',
    //     status: true,          
    // }

    // const newShop = new ShopBranch(shopData);
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

        // let data = await ShopBranch.find({ _id: shopId });

        const data = await ShopBranch.aggregate(
            [
                {
                    '$match': {
                        '_id': new ObjectId(shopId)
                    }
                }, {
                    '$lookup': {
                        'from': 'feedbacks',
                        'localField': '_id',
                        'foreignField': 'shopId',
                        'as': 'feedBacks'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'feedBacks.userID',
                        'foreignField': '_id',
                        'as': 'userInfo'
                    }
                }
            ])

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

        const { description, date, time, customerId, ticket_status, shop_ticket } = req.body;

        console.log("crypto.randomBytes(16).toString(); :-", crypto.randomBytes(16).toString("hex"));

        const ticket = {
            ticket_number: crypto.randomBytes(16).toString("hex"),
            service_description: description,
            service_date: date,
            service_time: time,
            ticket_status: ticket_status,
            ticket_owner: customerId,
            shop_ticket: shop_ticket
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

        const { custID, status } = req.body;

        console.log("rreq.body :- ", req.body);

        // '$match': {$and: [{ ticket_owner: custID }, { ticket_status: status }] }

        let query = [];

        if (status) {
            query = [
                {
                    'ticket_owner': ObjectId(custID)
                }, {
                    'ticket_status': status
                }
            ]
        } else {
            query = [
                {
                    'ticket_owner': ObjectId(custID)
                }
            ]
        }

        const View_Ticket = await Ticket.aggregate(
            [
                {
                    '$match': {
                        '$and': query
                    }
                }, {
                    '$lookup': {
                        'from': 'shopbranches',
                        'localField': 'shop_ticket',
                        'foreignField': '_id',
                        'as': 'shopdeatils'
                    }
                },
                {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'shopdeatils.shop_category',
                        'foreignField': '_id',
                        'as': 'categoryDetails'
                    }
                }
            ]
        )

        console.log("View_Ticket Data: - ", View_Ticket);

        // let data = await Ticket.find({ $and: [{ ticket_owner: req.body.custID }, { ticket_status: status }] })
        // let data = await Ticket.find({ ticket_owner: req.body.custID, ticket_status : '' });

        if (View_Ticket) {
            res.send({
                status: 'success',
                msg: 'View Ticket Successfully!!',
                payload: {
                    data: {
                        data: View_Ticket,
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
        // let data = await User.find({ _id: req.body.userID });

        let data = await User.aggregate(
            [
                {
                    '$match': {
                        '_id': ObjectId(req.body.userID)
                    }
                }, {
                    '$lookup': {
                        'from': 'customers',
                        'localField': '_id',
                        'foreignField': 'user_type',
                        'as': 'Details'
                    }
                }
            ])

        console.log("User Data Customer Profile:- ", data)

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
    console.log("req.bosy edit profile :- ", req.body);
    try {
        const { id, user_name, contact_number, door_number, street, area, city, state, pincode } = req.body

        const custID = await User.find({ _id: id });

        if (custID) {
            const custData = await Customer.updateOne(
                { user_id: custID._id },
                {
                    $set: { door_number: door_number, street: street, area: area, city_town: city, state: state, pincode: pincode }
                }
            );

            if (custData) {
                const data = await User.findByIdAndUpdate(id, { user_name: user_name, contact_number: contact_number });

                if (data) {
                    res.send({
                        status: 'success',
                        msg: 'Profile Update Successfully!!',
                        payload: {
                            data: {
                                data: 'Profile Edit Success',
                            }
                        }
                    })
                } else {
                    res.send({
                        status: 'failure',
                        msg: 'Something is Wrong, Plese Try Again !!',
                        payload: {
                            error: 'Profile Update Fail'
                        }
                    })
                }

            }
            else {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !!',
                    payload: {
                        error: 'Profile Update Fail'
                    }
                })
            }
        }
        else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Profile Update Fail'
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

//Category ID
exports.getCategoryID = async (req, res, next) => {
    try {
        const { cname } = req.body;

        let data = await Category.find({ name: cname });

        console.log("category data :-", data)

        if (data) {
            res.send({
                status: 'success',
                msg: 'Category Id Get Successfully!!',
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

//Upload Image
exports.uploadImage = async (req, res, next) => {
    console.log("req.bosy :- ", req.body);
    try {

        console.log("req.formdata:- ", req.files);

        const { image, fileName } = req.body;

        let imageData = req.files[0].buffer;

        console.log("imageData", req.body);

        // let buffer = new Buffer.from(imageData.split(",")[1],"base64");
        // console.log("buffer: - ", buffer);

        // const fs = require("fs");
        // Reads file in form buffer => <Buffer ff d8 ff db 00 43 00 ...
        // const buffer = fs.readFileSync("path-to-image.jpg");
        // Pipes an image with "new-path.jpg" as the name.
        // fs.writeFileSync("new-path.jpg", buffer);
        // let filename = Date.now()+"_"+fileName;

        let response = await utils.uploadImage(imageData, req.body.fileName);

        console.log("response View :- ", response);

        if (response?.status) {
            // conosle.log("Success :- ", response);
            res.send({
                status: 'success',
                msg: 'Profile Update Successfully!!',
                payload: {
                    data: {
                        data: 'Profile Edit Success',
                    }
                }
            })
        } else {
            // console.log("Error :- ", response);
            res.send({
                status: 'failure',
                msg: 'Profile Update Fail!!',
                payload: {
                    data: {
                        data: 'Profile Upload Error',
                    }
                }
            })
        }
    }
    catch (error) {
        console.log("Erro := ", error);
        res.send({
            status: 'failure',
            msg: 'Server Error',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Accept Reject Holding Request
exports.acceptRejectShopRequest = async (req, res, next) => {
    try {

        console.log("acceptRejectShopRequest: - ", req.body);

        const { id, type } = req.body

        const data = await Ticket.findByIdAndUpdate(id, { ticket_status: type == 'accept' ? 'in_progress' : 'closed' });

        if (data) {
            res.send({
                status: 'success',
                msg: `Holding Status Successfully`,
                payload: {
                    data: {
                        code: 'Holding  Status Successfully'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'status change Fail'
                }
            })
        }
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error ',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Add FeedBack and Ticked Close
exports.sendDeedback = async (req, res, next) => {
    try {

        console.log("acceptRejectShopRequest: - ", req.body);

        const { shopID, userId, feedBack, rating } = req.body

        console.log("View Feeed Back", shopID, userId, feedBack, rating);

        let feedBackData = {
            shopId: shopID,
            userID: userId,
            feedBack: feedBack,
            rating: rating
        }

        const newFeedBack = new FeedBack(feedBackData);
        const data = newFeedBack.save();

        if (data) {
            res.send({
                status: 'success',
                msg: `Ticked Close Successfullt`,
                payload: {
                    data: {
                        code: 'ticked Close'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Ticket Close Fail'
                }
            })
        }
    }
    catch (error) {
        console.log("error- ", error);
        res.send({
            status: 'failure',
            msg: 'Server Error ',
            payload: {
                error: 'Server Error'
            }
        })
    }
}



// exports.uploadImage = async (req, res, next) => {
//     try {
//         // const { imageData } = req.body;

//         console.log("imageData :- ", req.body);

        // let filename= Date.now();

        // let response = await utils.uploadImage(imageData, filename);

        // if(response.status){
        //     conosle.log("Success :- ", response);
        // }else{
        //     console.log("Error :- ", response);
        // }

//         // res.send({
//         //     status: 'success',
//         //     msg: 'Image Upload Successfully!!',
//         //     payload: {
//         //         data: {
//         //             data: data,
//         //         }
//         //     }
//         // })


//         // let data = await Category.find({ name: cname });

//         // console.log("category data :-", data)

//         // if (data) {
//         // res.send({
//         //     status: 'success',
//         //     msg: 'Category Id Get Successfully!!',
//         //     payload: {
//         //         data: {
//         //             data: data,
//         //         }
//         //     }
//         // })
//         // } else {
//         //     res.send({
//         //         status: 'failure',
//         //         msg: 'Something is Wrong, Plese Try Again !!',
//         //         payload: {
//         //             error: 'Category Search Fail'
//         //         }
//         //     })
//         // }
//     }
//     catch (error) {
//         res.send({
//             status: 'failure',
//             msg: 'Server Error',
//             payload: {
//                 error: 'Server Error'
//             }
//         })
//     }
// }

