const express = require('express')
const router = express.Router()
const refreshToken = require('../controllers/refreshToken')


router.get('/new',refreshToken)

module.exports = router