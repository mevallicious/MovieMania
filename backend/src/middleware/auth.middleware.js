const userModel = require("../model/user.model")
const jwt =require("jsonwebtoken")

async function identifyUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(409).json({
            message:"token is not provided"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user =decoded

        next()
    }
    catch(err){
        console.log(err)
    }
}

module.exports =identifyUser