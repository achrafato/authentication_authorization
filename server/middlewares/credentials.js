const allowedOrigins = [
    'https://www.mywebsite.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5173'
]

//it is like how we do in front-end "withCredentials : true"

const credentials = (req,res,next)=>{
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next()
}

module.exports = credentials


