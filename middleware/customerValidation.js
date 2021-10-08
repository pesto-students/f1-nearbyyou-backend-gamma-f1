const { check, validationResult } = require('express-validator');


const loginValidation = () => {
    return [
        check('username').not().isEmpty().isEmail().withMessage('Please enter valid Username'),
        check('password').isLength({ min: 8 }).withMessage('password must have minimun 8 characters'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.json({
        status: "failure",
        message: extractedErrors,
        payload: {
            error: "parameters not found"
        }
    });
}

module.exports = {
    loginValidation, validate
}