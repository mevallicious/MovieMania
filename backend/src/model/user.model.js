const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"],
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        lowercase:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    favourites:[{
        type:Number     //tmdbId
    }],
    history:[
        {
            tmdbId:{
                type:Number,
                required:true
            },
            watchedAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

module.exports =userModel