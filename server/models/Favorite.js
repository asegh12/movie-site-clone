const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRuntime: {
        type: String
    }

}, { timeStamps: true })

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = { Favorite }