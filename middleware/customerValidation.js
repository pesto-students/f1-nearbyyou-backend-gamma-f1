const { check, validationResult } = require('express-validator');


const loginValidation = () => {
    console.log("call :- login validation");
    return [
        check('username').not().isEmpty().isEmail().withMessage('Please enter valid Username'),
        check('password').not().isEmpty().withMessage('Please enter valid Password'),
        // check('password').isLength().withMessage('password must have minimun 8 characters'),
    ]
}

const signUpValidation = () => {
    console.log("call :- signup validation");
    return [
        check('user_name').not().isEmpty().withMessage('Name is required'),
        check('user_role').not().isEmpty().withMessage('role is required').isIn(['customer', 'vendor']),
        check('contact_number').not().isEmpty().withMessage('Contact number is required').isInt(),
        check('email').not().isEmpty().isEmail().withMessage('Please enter valid Username'),
        check('encrypted_passord').isLength().withMessage('password must have minimun 8 characters'),
    ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors ;- ", errors);
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
    loginValidation, signUpValidation, validate
}