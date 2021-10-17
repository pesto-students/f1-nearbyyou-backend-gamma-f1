const Category = require('../Schema/Category');

//Category Listing API
exports.category = async (req, res, next) => {
    try {

        let data = await Category.find({});

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