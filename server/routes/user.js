const express = require('express')
const router = express.Router()
const {verifyTokenAndAdmin} =require('../middlewares/verifyToken')

const {FindAll} = require('../controllers/user')

router.get('/all',verifyTokenAndAdmin,FindAll)

module.exports = router
