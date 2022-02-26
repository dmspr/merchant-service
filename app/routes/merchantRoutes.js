const express = require('express')
const router = express.Router()
const merchantRoute = require('../controllers/merchantController')
const authMiddleware = require('../middlewares/authMiddleware')
const validMerchant = require('../middlewares/merchantMiddleware')

// merchant
router.post('/register',
    validMerchant.validationMerchant,
    merchantRoute.insertMerchant)
router.delete('/merchant/delete/:id',
    authMiddleware.isAuthenticate,
    merchantRoute.deleteMerchant)
router.delete('/merchant/softDelete/:id',
    authMiddleware.isAuthenticate,
    merchantRoute.softDeleteMerchant)

module.exports = router