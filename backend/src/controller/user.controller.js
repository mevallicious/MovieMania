const userModel= require("../model/user.model")

async function addFavorite(req,res){
    const tmdbId= Number(req.params.tmdbId)
    const userId =req.user.id

    const user = await userModel.findById(userId)
    const favorites =user.favorites

    if(favorites.includes(tmdbId)){
        return res.status(409).json({
            message:"movie is already added to favorite"
        }) 
    }

    favorites.push(tmdbId)

    await user.save()

    res.status(200).json({
        message:"movie added to favorites array successfully",
        favorites
    })
}

async function removeFavorite(req,res){
    const tmdbId = Number(req.params.tmdbId)
    const userId = req.user.id

    const user = await userModel.findById(userId)


    if(!user.favorites.includes(tmdbId)){
        return res.status(404).json({
            message:"movie not found in favorites"
        })
    }

    user.favorites = user.favorites.filter(id=> id !== tmdbId)

    await user.save()

    res.status(200).json({
        message:"movie removed from favorites array successfully",
        favorites:user.favorites
    })

}

async function getFavorite(req,res){
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        message:"favorites array fetched successfully",
        favorites:user.favorites
    })
}

async function addToHistory(req,res){
    const tmdbId = Number(req.params.tmdbId)
    const userId =req.user.id

    const user =await userModel.findById(userId)

    //remove old entries
    user.history =user.history.filter(movie => movie.tmdbId !==tmdbId)

    user.history.unshift({
        tmdbId:tmdbId,
        watchedAt:new Date()
    })

    if(user.history.length>20){
        user.history.pop()
    }

    await user.save()

    res.status(200).json({
        message:"movie added to watchHistory",
        history:user.history
    })
}

async function getHistory(req,res){
    const userId =req.user.id

    const user =await userModel.findById(userId)

    res.status(200).json({
        message:"watchHistory fetched successfully",
        history:user.history
    })
}

module.exports ={
    addFavorite,removeFavorite,getFavorite,addToHistory,getHistory
}