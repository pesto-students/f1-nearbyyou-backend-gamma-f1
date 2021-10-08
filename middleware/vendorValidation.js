const {check, validationResult} = require('express-validator');

const vendor_create = () =>{
    return [
        check('user_name').not().isEmpty().withMessage('Name is required'),
        check('email').not().isEmpty().isEmail().withMessage('Please enter valid email'),
        check('password').isLength({ min: 8 }).withMessage('password must have minimun 8 characters'),
        check('role').not().isEmpty().withMessage('role is required').isIn(['customer','vendor']),
        check('contact_number').not().isEmpty().withMessage('Contact number is required').isInt(),
    ]
}

const add_shop_validate = () =>{
    return[
        check('shop_email').not().isEmpty().isEmail().withMessage('Please enter valid email'),
        check('shop_contact_number').not().isEmpty().withMessage('Contact number is required').isInt(),
        check('shop_category').not().isEmpty().withMessage('Select a category'),
        check('shop_door_number').not().isEmpty().withMessage('shop door number is required').isInt(),
        check('shop_street').not().isEmpty().withMessage('shop street is required'),
        check('shop_area').not().isEmpty().withMessage('shop area is required'),
        check('shop_city_town').not().isEmpty().withMessage('shop city is required'),
        check('shop_state').not().isEmpty().withMessage('shop state is required'),
        check('shop_pincode').not().isEmpty().withMessage('shop pincode is required'),
    ]
}





const validate = (req, res, next)=>{
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
    vendor_create, add_shop_validate,validate
}