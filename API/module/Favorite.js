const mongoose = require('mongoose')

const {Schema}= mongoose

const FavoriteSchema = new Schema ({
    Place: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Place" },
    User: { type: mongoose.Schema.Types.ObjectId, require: true },
})

const FavoriteModel = mongoose.model('Favorite',FavoriteSchema );
module.exports = FavoriteModel;