const {check, validationResult} = require('express-validator');

const update_ticket_validation_rules = () =>{
    return [
        check('status').not().isEmpty().withMessage('Status is required').isIn(['new','closed','pending','hold','inprogress']),
        check('hold_date').isISO8601().toDate().optional({ checkFalsy: true }),
        check('hold_time').optional({ checkFalsy: true }),
        check('hold_description').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
    ]
}
const getAllTickets = () =>{
    return [
        check('status').not().isEmpty().withMessage('Status is required').isIn(['new','closed','pending','hold','inprogress']),
        check('shop_pincode').not().isEmpty().isLength({ min: 6, max: 6  }).withMessage('shop pincode  is required')
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
    update_ticket_validation_rules, getAllTickets, validate
}