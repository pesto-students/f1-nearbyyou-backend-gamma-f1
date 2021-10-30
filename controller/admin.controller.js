const Category = require('../Schema/Category');
const Plan = require('../Schema/Plan');
const ShopBranch = require('../Schema/ShopBranch');

//Category Listing API
exports.category = async (req, res, next) => {
    try {

        console.log("Req.body category :- ", req.body)
        const { search } = req.body;

        let data = ''
        if (search) {
            data = await Category.find({ name: search });
        } else {
            data = await Category.find({});
        }



        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: 'Category Successfully!!',
                payload: {
                    data: {
                        data: data,
                        avaliableCategory: data
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !! category',
                payload: {
                    error: 'Category Search Fail'
                }
            })
        }
    }
    catch (error) {
        res.send({
            status: 'failure',
            msg: 'Server Error Category Data ',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Add Edit Category
exports.addEditCategory = async (req, res, next) => {
    try {

        console.log("req.body", req.body);

        const id = req.body.id;

        const categoryData = {
            name: req.body.name,
            status: req.body.status
        }

        if (id != '') {
            const data = await Category.findByIdAndUpdate(id, categoryData);
            console.log("Category update data in :- ", data);
            if (data) {
                res.send({
                    status: 'success',
                    msg: 'Category Update Successfully!!',
                    payload: {
                        data: {
                            code: 'Update Category'
                        }
                    }
                })
            } else {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !! category',
                    payload: {
                        error: 'Category Update Fail'
                    }
                })
            }
        } else {
            const newCategory = new Category(categoryData);
            const data = newCategory.save();
            if (data) {
                res.send({
                    status: 'success',
                    msg: 'Category Add Successfully!!',
                    payload: {
                        data: {
                            code: 'Category Added'
                        }
                    }
                })
            } else {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !! category',
                    payload: {
                        error: 'Category Add Fail'
                    }
                })
            }
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

//Delete Category API
exports.deleteCategory = async (req, res, next) => {
    try {

        console.log("Req .srespose: - ", req.body);

        const { id } = req.body

        let data = await Category.findByIdAndRemove(id);

        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: 'Category Delete Successfully!!',
                payload: {
                    data: {
                        code: 'Delete Category Success !!'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !! category',
                payload: {
                    error: 'Category Delete Fail'
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

//Change Category Status API
exports.changeCategoryStatus = async (req, res, next) => {
    try {

        console.log("Req .srespose: - ", req.body);

        const { id, status } = req.body

        const data = await Category.findByIdAndUpdate(id, { status: status });

        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: `Category ${status ? 'Active' : 'Inactive'} Successfully!!`,
                payload: {
                    data: {
                        code: 'Category status  change Success !!'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !! category',
                payload: {
                    error: 'Category status change Fail'
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


//Plan Listing API
exports.plan = async (req, res, next) => {
    try {
        const { search } = req.body
        let data = ''
        if (search) {
            data = await Plan.find({ name: search });
        } else {
            data = await Plan.find({});
        }

        if (data) {
            res.send({
                status: 'success',
                msg: 'Plan Successfully!!',
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
                    error: 'Plan Search Fail'
                }
            })
        }
    }
    catch (error) {
        console.log("errors :- ", error);
        res.send({
            status: 'failure',
            msg: 'Server Error Category Data ',
            payload: {
                error: 'Server Error'
            }
        })
    }
}

//Add Edit Plan
exports.addEditPlan = async (req, res, next) => {
    try {

        console.log("req.body", req.body);

        const { id, name, type, price, status } = req.body;

        const planData = {
            name: name,
            plan_type: type,
            plan_price: price,
            status: status
        }

        if (id != '') {
            const data = await Plan.findByIdAndUpdate(id, planData);

            if (data) {
                res.send({
                    status: 'success',
                    msg: 'Plan Update Successfully!!',
                    payload: {
                        data: {
                            code: 'Update Plan'
                        }
                    }
                })
            } else {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !!',
                    payload: {
                        error: 'Plan Update Fail'
                    }
                })
            }
        } else {
            const newPlan = new Plan(planData);
            const data = newPlan.save();
            if (data) {
                res.send({
                    status: 'success',
                    msg: 'Plan Add Successfully!!',
                    payload: {
                        data: {
                            code: 'Plan Added'
                        }
                    }
                })
            } else {
                res.send({
                    status: 'failure',
                    msg: 'Something is Wrong, Plese Try Again !!',
                    payload: {
                        error: 'Plan Add Fail'
                    }
                })
            }
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

//Delete Plan API
exports.deletePlan = async (req, res, next) => {
    try {

        console.log("Req .srespose: - ", req.body);

        const { id } = req.body

        let data = await Plan.findByIdAndRemove(id);

        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: 'Plan Delete Successfully!!',
                payload: {
                    data: {
                        code: 'Delete Plan Success !!'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Plan Delete Fail'
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

//Change Plan Status API
exports.changePlanStatus = async (req, res, next) => {
    try {

        console.log("Req .srespose: - ", req.body);

        const { id, status } = req.body

        const data = await Plan.findByIdAndUpdate(id, { status: status });

        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: `Plan ${status ? 'Active' : 'Inactive'} Successfully!!`,
                payload: {
                    data: {
                        code: 'Plan status  change Success !!'
                    }
                }
            })
        } else {
            res.send({
                status: 'failure',
                msg: 'Something is Wrong, Plese Try Again !!',
                payload: {
                    error: 'Plan status change Fail'
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


//Vendor Listing API
exports.vendorList = async (req, res, next) => {
    try {

        const { type, search, todays } = req.body;

        let query = []
        if (search) {
            query.push({ shop_name: search });
        }
        if (type) {
            query.push({ shop_status: type });
        }

        if (todays) {
            query.push({
                updatedAt: {
                    $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            });
        }

        console.log("Tyep :- ", req.body);        

        // let data = await ShopBranch.find({ shop_status: type });

        let data = await ShopBranch.aggregate(
            [
                {
                    '$match': {
                        $and: query
                    }
                }, {
                    '$lookup': {
                        'from': 'vendors',
                        'localField': 'shop_owner',
                        'foreignField': '_id',
                        'as': 'vendorDetails'
                    }
                }, {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'shop_category',
                        'foreignField': '_id',
                        'as': 'categoryDeatils'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'vendorDetails.user_id',
                        'foreignField': '_id',
                        'as': 'userDetails'
                    }
                }, {
                    '$lookup': {
                        'from': 'services',
                        'localField': '_id',
                        'foreignField': 'service_owner',
                        'as': 'serviceDetails'
                    }
                }
            ]
        )


        // console.log("Find Vendor:  ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: 'View Vendor Successfully!!',
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
                    error: 'vendorList fail'
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

//Accept Reject Shop Request
exports.acceptRejectShopRequest = async (req, res, next) => {
    try {

        console.log("Req .srespose: - ", req.body);

        const { id, type } = req.body

        const data = await ShopBranch.findByIdAndUpdate(id, { shop_status: type == 'accept' ? 'paymentpending' : 'reject' });

        console.log("data: - ", data);

        if (data) {
            res.send({
                status: 'success',
                msg: `Shop Request Status Change Successfully`,
                payload: {
                    data: {
                        code: 'Change Status Successfully'
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