const {check, validationResult} = require('express-validator');

const vendor_create = () =>{
    return [
        check('user_name').not().isEmpty().withMessage('Name is required'),
        check('email').not().isEmpty().isEmail().withMessage('Please enter valid email'),
        check('password').isLength({ min: 8 }).withMessage('password must have minimun 8 characters'),
        check('role').not().isEmpty().withMessage('role is required').isIn(['customer','vendor']),
        check('contact_number').not().isEmpty().withMessage('Contact number is required').isInt(),
        check('vendor_category').not().isEmpty().withMessage('please select category'),
        check('shop_name','Please enter shop name').not().isEmpty()
    ]
}



const validatevendor = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors = []
    errors.array().map(err=> extractedErrors.push({ [err.param]:err.msg}))

    return res.json({
        status: "failure",
        message: "parameters not found",
        payload: {
            error: extractedErrors
        }
    });
}

module.exports = {
    vendor_create, validatevendor
}