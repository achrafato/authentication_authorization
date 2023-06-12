const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {generateAccessToken} = require('../token/generateToken')
const User = require('../models/User')

dotenv.config()

//used to refresh AccessToken
const handleRefreshToken = async(req,res)=>{

    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401)//failed or not been provided.
    
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken})

    if(!foundUser) return res.sendStatus(403);//server refuses to accept 

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err || foundUser.username !== user.username) return res.sendStatus(403)
            
            let accessToken = generateAccessToken(foundUser)

            res.status(200).json({isAdmin:foundUser.isAdmin,accessToken})

        }
    );

}

module.exports = handleRefreshToken