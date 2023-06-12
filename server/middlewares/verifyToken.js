const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const verifyJWT = (req, res, next) => {

    //depend on how is spilled 'a' or 'A'
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // req.headers['authorization'] || req.headers['Authorization']

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({'error':'invalid token'}); //invalid token

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}


// verify user   (here is for both admin & user)
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyJWT(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json('You are not allowed to do that');
        }
    })
}


// only for admin
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyJWT(req,res,()=>{
        if(req.roles == true){
            next();
        }else{
            res.status(403).json('You are not allowed to do that, only admin');
        }
    })
}




/**                            /**
 * both :: DELETE - UPDATE      * Admin :: GET ALL USERS - GET USER
//                             */




module.exports = {verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyJWT}