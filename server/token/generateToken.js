const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


exports.generateAccessToken = (user)=>{

    return jwt.sign(
        {"UserInfo": {"username": user.username,"roles": user.isAdmin}},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' });
}


exports.generateRefreshToken = (user)=>{

    return jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1h' });
}