const merchantModels = require('../controllers/controller')

const createMerchant = (req, res) => {
    const merchantParameter = {
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        phone_number: req.body.phone_number,
    };

    merchantModels.findUsername(
        [merchantParameter.username],
        (error, results) => {
            if (error) {
                res.status(500).json(error);
            } else {
                if (results[0].count > 1) {
                    res.status(400).json({
                        message: "username is not available.",
                    });
                } else {
                    merchantModels.insertMerchant(
                        [
                            merchantParameter.username,
                            merchantParameter.password,
                            merchantParameter.address,
                            merchantParameter.phone_number,
                        ],
                        (error, results) => {
                            if (error) {
                                res.status(500).json(error);
                            } else {
                                res.status(200).json({
                                    message: "Merchant has been registered.",
                                });
                            }
                        }
                    );
                }
            }
        }
    );
};


module.exports = {
    createMerchant
}