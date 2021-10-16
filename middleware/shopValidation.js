const { check, validationResult } = require('express-validator');


const add_shop_validate = () => {
    return [
        check('shop_email').not().isEmpty().isEmail().withMessage('Please enter valid email'),
        check('shop_contact_number').not().isEmpty().isLength({min: 10, max:10}).withMessage('Contact number is required').isInt(),
        // check('shop_category').not().isEmpty().withMessage('Select a category'),
        check('shop_door_number').not().isEmpty().withMessage('shop door number is required').isInt(),
        check('shop_street','shop street is required'),
        check('shop_area').not().isEmpty().withMessage('shop area is required'),
        check('shop_city_town').not().isEmpty().withMessage('shop city is required'),
        check('shop_state').not().isEmpty().withMessage('shop state is required'),
        check('shop_pincode').not().isEmpty().isLength({min: 6, max:6}).withMessage('shop pincode is required'),
    ]
}

const edit_shop_validate = () => {
    return [
        check('shop_email').isEmail().optional().withMessage('Please enter valid email'),
        check('shop_contact_number').optional().isLength({min: 10, max:10}).withMessage('Contact number is required').isInt(),
        check('shop_category','Select a category').optional(),
        check('shop_door_number','shop door number is required').optional().isInt(),
        check('shop_street','shop street is required').optional(),
        check('shop_area','shop area is required').optional(),
        check('shop_city_town','shop city is required').optional(),
        check('shop_state','shop state is required').optional(),
        check('shop_pincode').optional().isLength({min: 6, max:6}).withMessage('shop pincode is required'),
    ]
}


const validateShop = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.json({
        status: "failure",
        message: "parameters not found",
        payload: {
            error: extractedErrors
        }
    });
}

module.exports = {
    add_shop_validate, edit_shop_validate, validateShop
}