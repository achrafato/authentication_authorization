const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//middleware 
// const credentials = require('./middlewares/credentials')

//routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const refreshRouter = require('./routes/refreshToken')

const port = process.env.PORT || 5000
dotenv.config()




// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials)

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin:'http://127.0.0.1:5173'
}))

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/refresh',refreshRouter)


app.listen(port,()=>{
    console.log('server is created')
})


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    console.log('mongoDB is conneted')
})
.catch((err)=>{
    console.log(err)
})