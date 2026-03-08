const express = require("express")
const authRouter =  express.Router()
const authController =require("../controller/auth.controller")
const identifyUser = require("../middleware/auth.middleware")


/**
 * @route Post 
 * @description to register a user
 * @access private
 */
authRouter.post("/register",authController.registerUser)

/**
 * @route Post 
 * @description to login a user
 * @access private
 */
authRouter.post("/login",authController.loginUser)

/**
 * @route Get
 * @description to fetch user's data
 * @access protected
 */
authRouter.get("/get-me",identifyUser,authController.getMe)


/**
 * @route Post
 * @description to logout user
 * @access protected
 */
authRouter.post("/logout",authController.logoutUser)

module.exports =authRouter