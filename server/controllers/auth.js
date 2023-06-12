const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateAccessToken,generateRefreshToken} = require('../token/generateToken')

//Login
exports.handleLogin = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    let user = await User.findOne({ username }).exec();
    if (!user) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {//{"User":2001,"Editor":1984}
        
        // create JWTs
        const accessToken = generateAccessToken(user)

        const refreshToken = generateRefreshToken(user)

        //insert token into userDb
        user.refreshToken = refreshToken
        await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken,
        {httpOnly:true,secure:true,sameSite:'none',maxAge:(60 * 60 * 24 * 30)*1000});//1h

        
        // Send authorization roles and access token to user
        res.json({isAdmin:user.isAdmin ,accessToken });

    } else {
        res.sendStatus(401);
    }
}


//SignUp
exports.SingUp = async(req,res)=>{
    try{

        const {username,password,email,isAdmin} = req.body

        let user = await User.findOne({$or:[{email},{username}]})

        if(user){
            return res.status(409).json({'message':'wrong credentials'})//conflict
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        user = await new User({
            username,
            email,
            password:hashedPass,
            isAdmin
        }).save()

        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
}


//Logout
exports.handleLogout = async (req, res) => {

    // On client, also delete the accessToken    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(203); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    let user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(205);
    }

    // Delete refreshToken in db
    user.refreshToken = undefined;
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);//all good but we have no content to send back
}