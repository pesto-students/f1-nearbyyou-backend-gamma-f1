const User = require('../Schema/User');
const Category = require('../Schema/Category');
const ShopBranch = require('../Schema/ShopBranch');
const Ticket = require('../Schema/Ticket')
const Customer = require('../Schema/Customer');
const Vendor = require('../Schema/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

        const { description, date, time, customerId, ticket_status, shop_ticket } = req.body;

        const ticket = {
            ticket_number: customerId,
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

        let imageData = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAQABAADASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/aAAwDAQACEAMQAAAC8BAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlCJmosgsoJKCygSgkoEogtEKlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEwoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkQmSqYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJEyiEwQmKAAAAJESA2MWuYAJWImEgBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ljTbpnp4tPX1k8XL3ee58OO3mZyWi84iVkJEJBIBV49Oa5un1bzr5efqc6ebj2wz5z0a3Pm16ea5iRAAESIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJIkF6ds10e1p1N0tZeVMuiF8zzvepnp81yfU+HNeevTXKEkibCsoJhqej72HeQtFlKTzzpTg6eadMuXfGTDn6MtYzi1bzk0M2mYJIWgqkQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATBJYSIJJWsucawa/U+Z7qSLBETHNWb1458bPf0PLzs1Xn7OfXnysXN5rYzjUZdePpR7m/OrXntpLzW65rG2q55eLv8qarja+b53J6vBrOfbx9FacffynLMyym9prGNqJlFosgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0axSOjJqlpuZ33vLhbS01SNh6PqfN9FnvvChPe5/Jib05qp6M8+ja8uPTrhzww74PJ07anJG2BtbCTXt83Y9fr8f1665rGuVlNIZ6Ut4PJ93izvy9ZmHH28hx2s1m8rLhXfNKTnCdit2uamlGaCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0c/RL2Y70bx0v0RhXqzXkNEi2lZeevVtZz26MKrnoiO3i0Ovq8bU9yvFYtzZ8UdnPhQm1dKnn6+ezPbPSN+3zJmvbp4lbn6L0fj/AEk+gr46vV5eXjXfn55zb805WWvgToplSui3LY0zVTVlJCCBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo59pe7Oxt18fTGlaWXm0m1l4BMCImSsaZlImpljtmkTEFoEmEExEFogSiCUSk1ktQkogtmE64yWzmEEkAsStAiYAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1y1l7Nc9m85Cu9NSFqCJoXVkmai+VqlItQzpeEzWqAImEiJgBIialkSTNZWIvRETBUBMCJhFqiYkQBKCYmAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbY9EvVvj2N4bRqb8nTwnRlSSmmHupXj9zzE8sNQiCaWgyptkkVmqRAW6cO5eLHq5UiWhnG+JBKQtUQCECJgFisWqAi1ZImBaJgRMAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2x0l9Lu8/qa0r0ZLjl1ZmeuXtJ4nq185fd8nImUXzWtEF4ZF6OpOKvbyIbbrwXZJaztOGvt+ORRYpZVNaqy1JsrXWhWY1Jtql5s98bKy1TKNMwkJixRaSiVQAAAAAAAAAAAAAAAAASQlESACJgCgAAAAAAAAAAFoR2+l5X0TefB7HCYxnstve8H1WdPnvT8pabZWWa9UHLWcxFoSfR873DPzvo6WfKazywpaSfW8faX2PFtFmG1YN+Xt5oxNLKx05LlVomd9MjstlOdZc+tdZrvhoRlpUrKSEki0QpBAoAAAAAAAAAAAAAAImJAKSIlACAQmAKAAAAAAAAATEwB0ez5Hc36eNM7ae54nuzPL5HteGvRvtFeXvzevHbxdnlWefopNXw12TD6L5v2D1aW57jxfL6Oea6fU8rtXi5d8E6vV833JePxPrPC1OGkWimk5p14Vhc98ydfL0Yy5zntZa+0TXFTXK5vMwZzNSbZ3S+dqrEWqgUAAAAAAAAAAAAEJiQAaLm07182PrvnDkLs0ep565yCJgRMIFAAAAAAE3jN0azrxu70V8B9D41zbv4eg9Lo872rObm9TwI0x9Kq8k8/vJ5VPa8I6PQy9NPM8X3PEX1vS5e658HD3Pmpfe87ilb39SD51aybT63QvzPs+ZaPf8mvFXNvQndx788uO2PRZbm7+WXKKbXOWumJ3UzpNZ56VuVs+gjDfAtFpKRaSkFgAAAAAAAAAAAAEiAAN/X8HWdvbp5nuzrw830HMeL6XNxp73j8xnuvxa3HA09O48e2snPG+SVCBRKIa1KSgm9+uejp9jx5m8KWjPqd/AOnm30uOG0Vc+vt6+XflcUyepz83VXF7njJPR8b1dTHs8OTfk9qTg9r5v106/nPT8Uw9fye5fV8uIOCfb8lPZ9HwvVXz/AA/X8dN+7L15eHyvp/Ds4EdJzujlOrCloy6K1s7OTbCWumXRYx1yWuuRLxrovLE0Z0VLWYlITFAAAAAAAAAAAJgShEoErQQnStvs/B94VtBw+T7HmTp50bXzeTPv21OH1aYrz83XzzNJ2zXnvppc8tO6py9dec9KmW+d4tNFejx9c9OPBvi6D0zzGuU16uXnZXhTr4OrXH6rkcmuVaZRL6HqcnUxx+d0Yte3Ec1z5dcO2b9qyLz+f5urhm769ep42e2J1+t5/tmnlevyWfN9PHnGuXXZaet4G0er46bOft49Y6uHfmI6+TrL8XdxlJr0WYTbM00Wl51Zs7qs5rnRNzWbWMZmEmtoqAAAAAAAAAAAGloyva65WrY059brHscPvHbNLsqprj872eab8WeznzrPDqmzyKdOFy6rxnTDJZpfm1s0t1TnXn593NZnemhjvWx7eXJ689PnZ+jzTth6nmY3NsqZsTW+rjOXXe4oy5q6vZ+W9ZPQrycx2ZVma6scsLNtcNz2+TzskpFsz1s+DuXk5vf8xI935z3jt87TwbOa2e0erpTFrzM12ersr3zXjcHs+Pczo7JfOnbls6MY2jC85WWjWC1c5JjqyWjO6VjSpF6lrMkReKpFoSAAAAAAAAAT0X55pF80NelcK+pTO/Mv6nm2bfRfPSm/0Xyw7/W+Z7l9nl05bKY0pnW1vP6E18/GLNubXRcGmVzWLynrbeRbPTo5qUueiud1nalTv+j4+y82eiuPk9es34GPsZTXl20iIR556PJbis67c1TtymKqySbct4s6/Q8LY69OP1Ws+P0POJ9LzPUPR5fRrc/JbOSXaI9SOHl9byK0pXsk5qez5q79PkDfl6ZTDr4bG/LbOy2uFia9GazGZI0z0OvmtjLXSO10w7sffz287g9/5wvVo650+v8AN15PApfW45K9ubPNG1bM1oIAAAAAB6PH6mc3509NJJjS03ha+dk9HHRPUt5ei9tcbS2tWD08fL3svzoObuw0TGLUrW+Aml7wzjc557qrxb36DhrvVLUrqfSdfyHRZ9Q8TnT6HyPPtNce+HKdNadBXm6eetN8aJEUJpfIt4pZJX0lzjeq83qeb02dWFtprn9by9q+l5+PzmefC1V6vR8e0vR51q3OnseL6cvp+T1+VXLpndO7LLKWtZXKtqi9JOnGtVWrdJppkSi69ttsOf04nu5LzzgmkwXu5o77w8eNaVvPJ03zM+lZxZ9+acNezKznXogAAA3PQ35d504+7h9NPNwt3nE9DyRWehMF8yejl0OiK7Z1nWcjWMlXtS5mvVOabrmN69U1zdeXIvVnhFmsY2Tpcw9Pbk61rzehwLzxjVn1+Dp5pcovrZzddUuc6XXlr15pzt6WQvrLjpW6r44nRjWlzPXydZ2e14/pNcXB2ccRnepRE2K2iNaxUppks2wmEgEoACsiAAACSJge5HJ3493ueE4Lyy9Hm+pX5jH2PCmvQ9X56CcrZXMaZWvn6d+HpN0WKZ7wcXP6PNc8i1bAAFqjv6Md5vPtpVeXtr0Jh4nv8KYex5vpW5clOyOJ3K8zLT0JPOr2l4bdfOQaxSLyuUzYqtBC8GVKVudq5SttcdpZx7+WylemiXwtoZ5aCL1sRpjB0ZVzNN+aptrx9ApbJHXxdZyLWM0knp5vSaOvOa5Hd1nivb5jys+3lSsa1M66VsomSsWhKy1XFsjF02ON1Scbr3XzZ6M7M7bZF4tWWlr2Snu8v0a+Fz/R8Lv4e+vJOtMrUmbVpNxWvTW8cljLop0rabyUaDHDs568/LbG4AAEno1i030RpxF/R4eiuD1Pn/o05drci+X1Y9Uz3c+/HdefrnaZ7pVus8bc8mumGpFLUM9cibqSs1iEWpciIkrMDfK+Sk3SlsyNM7lts6rkE6FOhrinr5WYIOvm2wtSmSEC0wHu+H6DX0U+VtN+tPJe46IxFua9VxnS0vF5vvchw9PR0r53N7WVnjdHdTNwbjGN4l5qdPIl7eXpXdhFVvyXzuYtWUjoj0D3b8Glx1vJxPb58+i3yPP9vzc7421YpXaE8+c2s9fX5cr6jzanu6+T3Lfi24TDK1bgCQLVsde04zfdjMlt68lc/wBF5VU6/M9Ki+f6vjeulOffBePfPRJhlEZ2oTEQWIK0vKRGmSyQlqaZiZ6TklCXzmCbbXXmpMJaablXb561N0xvTVdOaYJtS6WzktL0uisia2qX6+T0mkejTHTl1tWWYihNIiUrFl8oqmuvKOqvMronlHTXCDojAm0Zb1x7TOs5JQpr0HL190NYY7eQnVjnvZSvoJeL0cs07LedQ6+aoim2RlNouZVhYlolJiyoiSlbVuRIBNqyejVE3fPr5E7vK9LjPa4voPFrCuHQYddszPivrB7XiVPF0YRt0aQeYEbZdcvNn7WVeXSYSVrmANujLaapz9fOnPatrn0eLTnarenSmFenA0xEnrx6WuSm2TMaZ9q8tOjmJ0z1MpSiIkibVLet5Hpr7jGzd4rIrYZxqMo3k5ado4I9BHBHoyec9JXmvSk8y3ok87h9/wAM80qmls7msTdcdeDrTo8/sqYd/PlNdOWOadEZ6WZ1EvWBbK4pXSxjOtEvEQq1ZImkJMTFJiRIq1ZO3o5uqbq4vTSOV1Hr+XhvZwejlxHu+dbM8z6LwPoEw4OnlXnr2cce/wCN0ecTasI6uXRfX58+FaWiGW2NRMDTs8/pl049uexM3SlbVL9mHTNUx6OVcRcdO3B0NTz3ojbEnXyWqqYlHRh1tcNolnfntUn0ODoX13Azv0Hnyeg88d7zx6M+ZY9J549G3mD1J8qx6k+Ur1nkyeq8qD1vHvyJz1Tcr3zW3Tz7HJ21gtz2gomiWtmJqoWiYIAITSKyFRetqAuRXTMmJikhKJUQnZvhvOnJ7nkekz5Hs+d7aeTffjWmte+zDHTzV9Hl6MYvjpzGlN+k86sWK74dsU5PpuWvGyvVI1rtLljvhYughvkRRKa6znNZULm/ZwaL1ce/MrSnWnI6OdBoM+3lWqNEZ6ZrrpzWKzGqZolW2HSbR03x04XZNcMd2RzNMkRFbNGJNpwG7AbsIOieYdLmmt6ZXJraTs4NMyevD1jz7er49mPqef8ARS/MUsTXHXBYLJFL1ItWENalZqNsurBc5ghpSkBMWgCJFqJg79s03TpyJpvz4p6HndMmlvN66nyvU5I+m8S2NV4unmj2d9eI8qs2SvpeZ3S+7w9vzdc8WskdHLtLzotYr05CchFq2Tr54qtdM+s56dvOUrMJt156zefJ0cqLVi57sKVWAkw1M40zJ7+Xsa82RmO3i9BrsaU59a2i1Vy2xMcdsrMq3qznFq6yiRESSAgEzE02x0Wt6XgmF1324T0/LnQrtTmSttPbX56loSa9OJn0825TLSqX15dVzi0J055WWiYTfGYIBaChIComDupek11c/peQnt8f0HjpyUz9dfPvpkcnVwfQni61gthTpOjlysRnbQxvtyHp+bfMlHUckeh56Rrl0Lr0Zb515uOuWsLRqYNKJbt5O2ajLTllyhOsbdXndLVcLVZ1dFprhXpc7V0xWswTfAJ7eHRcwj0/M9Ka76aVx2i02syx6cTlx6edMq2rc5pjUgIiYCCF9zmv6G6+Zf0/NMIVTS2Wh9h8773jnmen5nUvd43bwpp6Xj6LnGnaedGmSGlSnbx9q8+XZyJPRzdZxtM0lXpOdehAJFSFEkA9CKXmrUnQ93yqVTj+l8Drs08/e8vL9V8h7lnmc28S4+/899fZ8rTfCXH0PM909Xw/o/nrPKmtY29Dz/Ump8Tt47I3xJ6FK8s1nMb3OMdGBCLJHTzF7OW2Y6c+xeCvdxJW9dU7Fss9OXNbXOIC07atcIZ0z3wVeJKel5vqTXcm3PstadTHHowObDqwTmprncZxatkCxFvWODp9rzzO8JqUTDzPT83WcE1S2lPeMPOzk2z+i8Bce3h9s8vn9Ty039vwfRmvMyt0Wcq1EX1xNuduY325i1Y0SmmcFqtDLbLrWuHtUl8cnUAhPWUvCW816TmnTnOnD3PKLc2mhz36cCubuOPpryiumZXt58T7D5Pq4Sto3Tn7uGViaXScvQLxZ2qk93N2S24OzzyJhc9GGmk1yrVuezo5enO7eb18ViLLnqjmuuXVzdhjjMJvrx6LlLRKzQAPY8b2s77dI1x2hpFnPh1c5hj04Jx5601nOt6s0TavT91bU5fM9XyZUxMqYmI8n1vIuVZWX+v+O+nX5+BPsPkfb8Mw7qcq3pPeedPf5ybdvJ1zXBjbquee+UDbInocG2DVZmE6adnMc16QO3i9CXrQmvGl6m8eb6XtdJxdd+BfGy1zln1PO2TXz+rkPsfA935pOb3PC+iqPC7uSXh+s+Y+ns1+V+s+RiNMus9fwvsPGPEyDT3PJ95efwvb8FFog9Pp4dpryqrXN+vg6ZY5dKWaU7S8F6wzCeg5+vlLrhaqdF9dJvza9vFc26MRTXH0Dgjp5ye/l7V86vZxJetqo9LzfRa9Ds8m+d+zHH1TWfP04TWfP18ycNNM7mlbVuadvH2az9OtSs/N9Tll81aubMwHk+r5lzSa2s6Ho+MaW7tF83p4vdPR+T+y+Ws5vU8neX0/E6srMtM6R1d2PXNebyej59zvrzemvkTaWduboou/LEG2HocRT0fP7F66xEvq96NSYDl+c7eDF1mO6uFXexi3PS8vODorXM0pfM00185Pofnt8RXs5T6v52nITampX6L5rZa5xZLZ+nzrzsiRevoL509vGlNses6ta3zvz+bo5dYdnFqdXH6fHLzWpa59G/NvnfPyWnWaNsUv6PB2TVfP1zsel5vSZ43FJSX9HzfTzqJiVnfFXpRwd2NxydnFNcVLU3isTDOeuUWfcRwenrOFNqLx8PsRL4j0eOMvM9LgMTvuezxdcj2o8+hn7nlF+g8Hp4k05vqfBXj9Hz+0nzunnTs7fH6JaMfbrxNteRDSTL2PH9w8WnRzp0YRquXbxdq6Kpfp0NSYgfO8vseNi+zS+54Xs+P7Wp5Xref9InymXRgv0fhfTfLJl6/i/TV0/K/Y+DHlxPSv0nje95SfOEHT9L53s18xwe94EOvk6T2vQxvb8vyb4SW9Pzdl9Pw+rlGmcJ61cImuasdNxjT0eBd8Igi2vScO+EEdnL1mfPOpjtpiZ7Y9Bry+5568HVy9SUztkX9Py+/Opty9JqibY6MEejwd3Bjrx0vXWKRatlK3rZr9X8d03P2dObqucs+qq82qq14/Qg8bb1LR8V3fRQnyGnt8x63y/wBd4Fvmeh53tR7Hyfv/ADlRPq+TI9Ty/cXx8fb8VNfe8H3l83zvQ4E1rSCfR8+pattzkvSxHbXtXmv6FpfQGiAr4fvVzfB+i8PDM7bz6dfO+7xcqcufTy6fQeB1cpbqpzH2HznufMJhsov1/wAvr5qJv6Bz/R/IejXNxzpFI9XzF+hr4fScEx1pzU+j8JckaJ18PsaL4UzRmfU4PWajm7sprxYtW8+zs8rqmp4b0suzlHocPoTWvm3yqLdeR0c+AiyyYpsNI0lnrrdUyWKzlHq8Poefjpx1vXUpFq3NK3rZWLVsv7vzy5+31+P9k9iMNS1bSlI0LSukFYvCxMWMI3g5cPSlOXzfaL4fb3jzPO+jHzXb7EHz8fQweBb2x5mXr1jzdeqixphlHVlx4r18+GMfWRpXeahQKc3bTLx+zryzfM9DmS5Yx7EeRPXjue7896W9x4/LrW31OX2+ZPmWua+p7/nejc/Neb9J85NR38Htnr+f61E+Jr38Cva8b6U6vmPX+fKrwnb7fzHqLwc+maX9PyepezhjErafRTzI0zJ1x7Dlreprpz6y5xetnp9vh9ed44b5pKLGc7b1jva8sWkTVgJ5/alv5/f5+enNXSlznW9bKUvW5rFq2VSsi1Fz6HofP3X6jo+V2X6ifntj3HkaHqT51zucQ7Y5JOtxwdjiiXtjhoeg82p6UeZVfSp51I9CnBEdleOp115Mzry5c7OnLGlzpSCffxlrVK7VXKNKrAVnpZMa7RNcOXo1zfD39OkbRmZvnxTL7PL08lz4medrrr+h+Z9tnyODqxWtuvlr654fbc/O4a0WPU8+h6vj6UTt6Z9PO/lo+l+c1jPfHuXij0OIrTeqTpzbS7ce1ilSyyyVnpK1i4iNdY5dOu5za7yuLcZXtkWzzzLZ29NXdS2N4cHbw1lS9EpS9LK1tW5rW1bIFlUwyFATpkOi/Ijut59l9G3m2X0p87eXrnjhe2OGDurxE7K8kHXXlHTHNCdMcsV0VwJpWqwACUDv+h+Qsfb6fMeyvfGWiK3kyaQudwotCxW4yy7Ijz6eia8y3oUjy8/VqcXTOccnL6dTiz7ar0aefnFOXuWY8noUOC/XnZft8+mNe34Nms09Hik7+OtzmdmlcVu6x51fX1rwrfQ2PA29uTytPTg87L1KHm691ZcbMjavNkdOGWcXyz6TDu6r53FYq10XznLDh6+LUrVS5VmtRWasqTWwLICQmECgAAANPR4fQx1YdGEvPltlrFYlZAICEwAQLAAAAEwJvnJ6nq/LXPsdflfQX3J83c7JwsaxSUtAsRYVi4iJFJsWtkpRJYSIjQZRcZtBlG0GbQZ2sKxeCszAhUspBpGVV3c1I644qnbXipL25cmZ1YY5x0U5806c+alm88+p6e/k756+jPFrNaTz6HbFUcvF18dzSLU1IrNUisxcxExYQBCSggAUAAB1+lw93PtXn6uWXmprnrGSYsRatIkiJhBJVKyAAAAAAJgTfOTr6PMHt7eDrL7+3zui/RW+f0r3ni3PXeXaX0586yd7jV2OOV7HIOuOVHU5B1uODscVTujhqd8efEvoR58HfHnwd9OKsdkcUHXXlHTHNU6Y5qnVXlrXVTmqnRTnrZtXKqaVqsEgE2oXfTkmXr04Jl9i3kzL28+NDemcWaUrFloiElBAoAAASImAAD0+zm6uXopzdXKmOXRjZlXTPWEBAsQCYIgsAAAAAAAAAAlAvbIdFuVHZbile23DK988UnbbgmO+eCy90+ePRefJ3xwyvY4kdccsHVHNB0xzwnRHOreMIN3PCdEc8HRHNFnRXEmlaqmAAAAmAAAAAmayTCCUAAAAAAAAAAASexvS/H00x2xsxy3ysxz2xuIJsqLETBMTBAuQAAAAAAAAAAAAJmolEl1ZVEiPR4PTxukrzeOW2VzjTXO5omLESIBCRBKQmAACBYAAAAAAAAAAAAAAAAAAAAAAAAvTU9m1LcfRTPXG2M98U58dKa50FkCwBEwQLkAAAAAAAAAAAAAACUCUDf0uD0+fbKbxNYZbZ6zhS9bmldKMwFRaKgJASYmAASVFgAAAAAAAAAAAAAAAAAAAAAAAE6Z6S+urbn3tSS552hMefo59YpExcoKBIBAZCgAAAAAAAAAAAAAAAO7tw6OffTPbLOsMt+bWKVvWymelUoLJiYIFgAEBExJCVREwgAAAAAAAAAAAAAAAAAAAAACYE6Z3l9S2VuffaiFxWqUx3wuMYmNYgUCQCEwyFAAAAAAAAAAAAAAJiSysnr7534+m1L1Mefow1mue2RnW9bmkTW5lElUxQIiRAQmFgXIAAAAAAAAAAAAAAAAAAAAAAAC9LR36c2/PvqrKxnestcbV1jKmmesQKBIBAuQAAAAAAAAAAAAAAAGme8euly9NqWoYxpnc5560rKulbnKtq2QSkRMUCAQmCYmCAyFAAAAAAAAAAAAAAAAAAAAAAAJgdO3J1Y671Z51aoZ2hZnltlrFRQEEMhYAAAAAAAAAAAAAAAA6uXsl9SaX5eilZFctM7IrrQyz2xucqWjWaphETFAgCAmJgRMXIAAAAAAAAAAAAAAAAAAAAAAACYE3ol6XNK9scrOujPOtm2dYslUkwWAAAAAAAAAAAAAAAAAAO7h7pr0Jo59rK2XOtxXO9Epz9dE5a646xVMWEKJgARJETAiYZCgAJgAAAAAAAAAAAAAAAAAAAAAAAJQAAAAAAAAAAAAAAAAAAAAAAHdw9udd00tjtJZYpahWsVS+V6pjltnrOSVzUUACCCYBEwyFAAAAAAAAAAAAAAAAAAAAAAACSEhEiEohMUAAAAAAAAAAAAAAAAAAAABPVydOdd8VY7aXzLeqDNesUrZc5Z653OUTXWUFAAiJEEkRMIFgAAAAAAAAAAAAAAAAAAAAAACUiZmarIImCEwREkhJISqAAAAAAAAAAAAAAAAAATvz7TXYyvz69CsNXRCTUlyllc3y0zsrlrnrERMUAAiYQBEwyFAAAAAAAAAAAAAAAAAAAAAAJiRatpZlKxFhWLRCEUgQAQgAUAAAAAAAAAAAAAAAA0zmOm+G2eu16XztVml4rYjK1bLxApnpW5ziYsCgREwCEmCwAAAAAAAAAAAAAAAAAAAAAACQNM9ZYlM1CaghIia2AAkAACgAAAAAAAAAAAAAAABI0zS9enBea66YxL1xWZqazEtJrGsTVUrBrJAlUloggUAAAAAAAAAAAAAAAAAAAAAAAABOuWssiaVtCREwRWYsIkEIAAFAAAAAAAAAAAAAAAAASgSiQCUCyomAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADbHaWZRNIiUitqUgQggAAUAAAAAAAAAAAAAAAAAAAWmWq0BJYTAiSQEgAUAAAAAAAAAAAAAAAAAAAAAAAAAAAA2x2ltExNRCLFZgiJhAQAAKAAAAAAAAAAAAAAAAAAWiZZmJVEiAImASkRMEBAAAAoAAAAAAAAAAAAAAAAAAAAAAAABrlpLpExLWEVETCQEAAACgAAAAAAAAAAAAAAAAALSTUpRCRCYIi0VCYIiYZAAAACgAAAAAAAAAAAAAAAAAAAAAAAAF6WjVEzVK2rYhACAAABQAAAAAAAAAAAAAAAACYktKZpMTEJgRMEJgRMWREwgAAAAAUAAAAAAAAAAAAAAAAAEExQAAAACYk2iGdRWYsiJhAAAAAoAAAAD//2gAMAwEAAgADAAAAIQAAAAAAAAAAAAAAAAAAAAAABP70gxnqwx3eIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMMNqMMIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDAAAAAADDHNOLHDCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGYx7CAADNLTWSehfdfCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO9Z6Vu2cNETFnDDqnITSUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDDCITlDWXkgdopmv/biO1FVSeYOCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGggmmFAnGjl3nDCde+1/CFV9RBudo8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIzPB4ioIu4MUaOtis3He0MGXlAQbgs6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOmP1Gblkfywpt36FFFmQ3cE1ZzSR+ogAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmCyiaTcbtGtEU1HLm3jn0g1//wAb++gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6BhQXV00eyK4I9bv/8Ae3y+2Xvz/nXooAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6QyGZUH1NUxresC2Sb3qKSme/rvD3soAAAAAAAAAAAAAAAAAAEMIAAAAAAAAAAAAqHyhTAXdIk4X8AlWCnH+6mNo73zvz5oAAAAAAAAAAAAAAAMY/vPXAAAAAAAAAAAUnS/pGq8wsxGY5kmLQfx4ehnxByiTiuoAAAAAAAAAAAAEM+Xeym/PuIAAAAAAAAEv7mAHapZxQFo1nUebxwlBJdZAydirO/oAAAAAAAAAAAM+rf72c76iWXIAAAEMM37jElkuiiuaikxSaV+OagCww5h0KdaaadoAAAAAAAAAEc9DX37WTnjAH4S/8Ads73AVPtZykPBopgji+PgVrjc1DDocVbEmB9q7AAAAAAAABHPbTzx8bKWSodl0MTdX633DW06IIVmnCDfX3GDqUCif8AcNtFGs7gbadggAAAAAAzzzzvpPW7bC+IFgP4VMSrcEbgX0AS6tzlBIkojhjkggXjxyLWGHy1I6IjwwAAAADzzyae5aCEyTF6uOjX16XiF9wLonBQ2RLTezzDBzWCeZbfeVXz1rqHqIHynNnAgADzzwZO+GuEq8AkGwg49SCvuRvL7pREKBTMckNR5QY2mVAxtUrw/wDO2VPCDpY02xkA8956Lw19MNXXkKjnLJUEtXsZn168CCbgksksKK8ONMR/9Lb++6q3/wBbM5xCqqyk8PPLDaFm7FmIzaJ3BnZkWBqISeIRYUPR5su1qQuH5yeAaOhR4rDFDQthd0VdzEx9LfPfLItCJD/ElJippvn6mhqIv+3/ANXv9zM8MTwQRX3lRTI1q/PRDDkuP0MGdqDkjp3wEl4bBhBwyAtu4rJYLbo99Ze9L9b4uqvsdDy5Fph8cijR0Si5d5sQAc/taNwIDxXj0GweuSl1eFp3+n2amLgvsy5J+iNJaqMuedjgjVwz84QiCbLfpc8LcVtsrJNcq/z2AQzpYxA1lnKl/hC4Y683tfmT/wAWDcrYzXV6TL7LDLzgc0DzuiKKbHmyufjPf6Kc1IF8iP75NOzm6nyvWi6Wb1e9UuDDNb2onKN7hAHU5hBXrI0WmW1e+Q6+n7P1/wATMFwFLDA2zPrHrr/40v7kbuzfMV5On4X227A6IytiMhUP/wB70SPKbofiqG1dj97/AL/N5EEsTTz7eeSGWyAY7suii75K/wCNxkze70u98Q35yoAUDtgWFrxqagLPvqDjY/8Av7kziiny5lMzfB6i04zrnTYKsrwg2eRt/wAbiuU+IA0jONSRwioGP7ipOCmyyaOfHP2j4C0pNX6bTbGyiOj8P1G7vb23+DThlXlnD3vCmHH5HO0soiXeyLKsA3sSCLYi/W6OoJ1Uqme4e0G7CKvfb5SRy4LzaXwe4O6Muv41OU0mPllq6OpuXy1ZAx1YzE76G2ExCTOzTL6aLz/fzaGnW18O7ij4zLPqLX4gW+PWsH+shqqZUlsRD74jKgO3u6avX2E4Jdp186r3YWaqbxDbZPUyewbGiia2K1Chpdi/8rMD8wWZJwFPrSc4wzgeBTWPKyFT48IfYXheqKi3zNr+DdIOl3EA3b6r+UccJ6xF0Kjqlw0tGwZahWqwtwAYxwsjGbwS4MMXTxFcDFSpF0iyc5p6l20ItWZmK51iaMSmeuGHWeiwdIMUdhNZVK0tsgqum8F/NBVc5MmMtGl8P6wFU8Rl1AE6uH9vsMyHOWGa4lZjWDpA3IQgXZsCww5QYTMiFg8M6iLZcsy5bYa9+rM0TV9j977olMgW2WGckS+Dtiyn8HOBv3MAAAAEbEFJ/wB7oAAAIJKL+94ERPgXqq6osrgRVY57kefJnYlE73U2aWHF4KmgTt64gDAAAx//AKBBfvgAAAABCShl+4FHa/XwBqoKQ16LxO/ue5xgAY3gUwl4cZBQa/zwDzxQBQj9MGoFytwAAAAAADDDBxw/KRGdI89i7YYdhCtr2PkATzxzDDDSlWzCAAAAADSgDiK6zcoFRQAAAAAAAAAAAAACxyJItj3CBEDJqd64QAAAAAAAAAAAAAAAAAAAAACASmfhYs4kFbgAAAAAAAAAAAAABACgqrmxPJAH9d/sQgAAAAAAAAAAAAAAAAAAAAATx5FmCUIwn6pAAAAAAAAAAAAAAAADSadVI4okED+sBQAAAAAAAAAAAAAAAAAAAAACQIJXxYqyH6IAAAAAAAAAAAAAACgkbKALgcqQFHPTgAAAAAAAAAAAAAAAAAAAAAAAj9vNJELQH6gAAAAAAAAAAAAAABC9sasnGxZwEHRSoAAAAAAAAAAAAAAAAAAAAAAARxit/JnQD4AAAAAAAAAAAAAAAAAW5vtbslpSElxQEAwwwgAAAAAAAAAAAAAAAAABQSZnZAC/1zywAAAAAAAAAAAAAACh23zg4fuyChBQMADRjAAAAAAAAAAAAAAAAAAByzDADTDCBAATygAAAAAAAAAAAACtlGQ9OzdzwEV58AAAAAAAAAAAAAAAAAAAAAADzjVX/TzzywzzywAAAAAAAAAAAAA4IUjZH9xzwFHr4AAAAAAAAAAAAAAAAAAAAABzzFAAA57/AJ884wwAAAAAAAAAAAAAITkxa7ERg80V+XAAAMIAAAAAAAAAAAAAAAAAUpGRZrseqn/4AAAAAAAAAAAAAAAAzNWGPFsS2UBU+IAAc84AAAAAAAAAAAAAAAAE8Rqqmsl6D/8AwAAAAAAAAAAAAAAAAGFjbsYsbufLg/AAAMNIAAAAAAAAAAAAAAAAPPPAEm2gyh//AMAAAAAAAAAAAAAAAADQ1lFkECzzzzzzDAAAAAAAAAAAAAAAAAAAAAAAD6JvBo//APoAAAAAAAAAAAAAAAAAQ0yiY0CP+MIAAAAAAAAAAAAAAAAAAAAAAAAAAAWAIwW//wD6AAAAAAAAAAAAAAAAABIhCBACQv16wwAAAAAAAAAAAAAAAAAAAAAAIAABhzEf+8wgAAAAAAAAAAAAAAAAAFBFvlYKP+17wwAAAAAAAAAAAAAAAAAAACAAAAAFy+Tv6xggAAAAAAAAAAAAAAAAAAOC918gd7/6wwgAAAAAAAAAAAAAAAAHPtffDDAEDyd/7zgoAAAAAP/aAAwDAQACAAMAAAAQMMMMMMMMMMMMMMMMMMMMMMMZfvgxwgRjHU1c88MMMMMMMMMMMMMMMMMMMMMMMMMM88888888888888888888888888M97l9tc888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888884x888888x9v37Xjx08888888888888888888888888888888888888888888884ojF1088wRiMBX6L+3v08888888888888888888888888888888888888888888egj4ggABVUMAKyLJOjDDD48888888888888888888888888888888888888wx15BQBR0ZWu88uaTAIIxodBH+jr08888888888888888888888888888888888zUoKPyB4i71hLyvAUnHXxcQMxkn5DL8888888888888888888888888888888888hK+oA/DZlTAAWk4ZEHBzQC5D940pkNU8888888888888888888888888888888888xk7lv1N9wz5FGutXa+P8AoaVE4LDWf/PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPLFGDgCcc0dZJMhQ5lOXJDOBc+yyj/ANXzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwuHGH3BQFjn3jyBAVQ0SQyjRe/PcYNVTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwryAmJean5VrGUjHCilXwGApb+++NdlTzzzzzzzzzzzzzzzzzzjXXzzzzzzzzzzzyo6dZQrS7BCunqdU0CFzEgRE4G7MnMhTzzzzzzzzzzzzzzzDnOMMLzzzzzzzzzzynfJOI011mzjsO/8AUVtXfFpekVSUmT6/U88888888888841fTGQkjD30888888884LDhh1xyy7MuWbUHddY6fY/Z3pAVe59m8888888888880frDGdWnGgAH08884xxTXaUs930xL6ZJnQDQolMByZurhdIORMcV+8888888884p9DDDd3bhcVYW++8zznj7/wDDiqPyOQliJYlzR7L1y1WY/d5YHDHVA8/PPPPPPPOYXbTjhyWAKN6pSKsfWZCmZ+6TUJS2+V6PnFNMyvFMj3q/my47CN0PN19PPPPPPMQVeU5yfrKmRAeX+4oD1mlh63Bf7aKsGgBebDOydzNmmLUvHF+l8JoJI/i+PPPPPAQQYGrcuw3XfsBwHmNn/grak3uAHjXMf52dB9G/Kkc8JI3BQpK0L7s+nMR2ni/PPERSfI7LlCS7O1I8Ce4vTjuzrb79/DcUiY7KtCL3XIFMNDdX0JGMIZz7iomWgvWP/PfbJVAjDhYf32iKGNfcPof09qNZfWvPOXY6u3WMEqXnUS9W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'

        let filename = Date.now();

        let response = await utils.uploadImage('/images/cake.jpeg', filename);

        if (response.status) {
            conosle.log("Success :- ", response);
        } else {
            console.log("Error :- ", response);
        }


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

