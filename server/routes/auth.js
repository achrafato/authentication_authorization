const express = require('express');
const router = express.Router(); 
const {handleLogin,SingUp,handleLogout} = require('../controllers/auth');


router.post('/signin',handleLogin);

router.post('/signup',SingUp);

router.post('/logout',handleLogout);



module.exports = router;