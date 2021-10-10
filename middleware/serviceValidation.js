const { check, validationResult } = require('express-validator');


const add_shop_service_validate = () => {
    return [
        check('name').not().isEmpty().withMessage('service name is required'),
        check('shop_email').not().isEmpty().isEmail().withMessage('Please enter valid email'),
        check('service_description').not().isEmpty().withMessage('service description cannot be empty'),
    ]
}

const getservice = () =>{
    return [
        check('shop_email').not().isEmpty().isEmail().withMessage('please pass shop email')
    ]
}


const validateService = (req, res, next) => {
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
    add_shop_service_validate, getservice, validateService
}