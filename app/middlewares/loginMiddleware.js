const Validator = require('validatorjs')

function validationLogin(req, res, next) {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };

    const rules = {
        username: "required|string|min:3|max:50",
        password: "required|string|min:6",
    }

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
    validationLogin
}