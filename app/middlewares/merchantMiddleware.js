const Validator = require('validatorjs')

function validationMerchant(req, res, next) {
    const data = {
        username: req.body.username,
        phone_number: req.body.phone_number,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        address: req.body.address,
    };

    const rules = {
        username: "required|string|min:3|max:50",
        phone_number: "required|numeric",
        password: "required|string|min:6|confirmed",
        address: "required|string",
    };

    const validation = new Validator(data, rules);

    if (validation.passes() === true) {
        next();
    } else {
        res.status(400).json({
            message: validation.errors.all(),
        });
    }

}


module.exports = {
    validationMerchant
}