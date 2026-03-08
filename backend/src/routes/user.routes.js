const express =require("express")
const userRouter =express.Router()
const identifyUser =require("../middleware/auth.middleware")
const userController =require("../controller/user.controller")


//favorites movies
/**
 * @routes Post
 * @desc to add the favorite movie user wants to in favorite array
 * @access protected
 */
userRouter.post("/favorites/:tmdbId",identifyUser,userController.addFavorite)


/**
 * @routes Post
 * @desc to remove the favorited movie from favorite array
 * @access protected
 */
userRouter.delete("/favorites/:tmdbId",identifyUser,userController.removeFavorite)


/**
 * @routes Get
 * @desc to fetch the favorited movie from favorite array
 * @access protected
 */
userRouter.get("/favorites",identifyUser,userController.getFavorite)




//watch-history
/**
 * @routes - Post
 * @desc - to create the watch history of movies
 * @access protected
 */
userRouter.post("/history/:tmdbId",identifyUser,userController.addToHistory)


/**
 * @routes - Get
 * @desc - to get the watch history of movies
 * @access protected
 */
userRouter.get("/history",identifyUser,userController.getHistory)


module.exports =userRouter