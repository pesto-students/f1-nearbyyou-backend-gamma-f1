const Category = require('../Schema/Category');


//Category Listing API
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        if (categories) {
            res.send({
                status: 'success',
                msg: 'Category found Successfully!!',
                payload: {
                    data: categories
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