const userModel =require("../model/user.model")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUser(req,res){
    const {username,email,password} = req.body

    const isUserALreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserALreadyExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        email,username,password:hash
    })
    
    const token = jwt.sign(
        {id:user._id,username:user.username,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}


async function loginUser(req,res){
    const {username,email,password} = req.body
    
    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    if(!password || (!email && !username)){
        return res.status(400).json({
            message:"email/username and password required"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}


async function getMe(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user fetched successfully",
        user
    })

}
async function logoutUser(){}

module.exports = {
    registerUser,loginUser,getMe,logoutUser
}