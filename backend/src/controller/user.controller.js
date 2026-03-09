const userModel = require("../model/user.model");
const tmdbService = require("../services/tmdb.services"); 


async function addFavorite(req,res  ){
    
        const tmdbId = Number(req.params.tmdbId);
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (user.favorites.includes(tmdbId)) {
            return res.status(409).json({
                message: "Movie is already in favorites"
            });
        }

        user.favorites.push(tmdbId);

        await user.save();

        res.status(200).json({
            message: "Movie added to favorites successfully",
            favorites: user.favorites
        });
};

async function removeFavorite(req, res) {
    const tmdbId = Number(req.params.tmdbId);
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    user.favorites = user.favorites.filter(id => id !== tmdbId);
    await user.save();

    res.status(200).json({ message: "movie removed successfully", favorites: user.favorites });
}

async function getFavorite(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    // FETCH DETAILS FOR EACH ID
    const detailedFavorites = await Promise.all(
        user.favorites.map(async (id) => {
            try {
                return await tmdbService.getMovieDetails(id);
            } catch (err) {
                return null;
            }
        })
    );

    res.status(200).json({
        message: "favorites fetched successfully",
        favorites: detailedFavorites.filter(m => m !== null)
    });
}


async function addToHistory(req, res) {
    const tmdbId = Number(req.params.tmdbId);
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    user.history = user.history.filter(movie => movie.tmdbId !== tmdbId);
    user.history.unshift({ tmdbId, watchedAt: new Date() });

    if (user.history.length > 20) user.history.pop();
    await user.save();

    res.status(200).json({ message: "added to history", history: user.history });
}

async function getHistory(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    const detailedHistory = await Promise.all(
        user.history.map(async (item) => {
            try {
                const details = await tmdbService.getMovieDetails(item.tmdbId);
                return {
                    ...details,
                    watchedAt: item.watchedAt // keep the timestamp
                };
            } catch (err) {
                return null;
            }
        })
    );

    res.status(200).json({
        message: "watchHistory fetched successfully",
        history: detailedHistory.filter(m => m !== null)
    });
}

module.exports = {
    addFavorite, removeFavorite, getFavorite, addToHistory, getHistory
};