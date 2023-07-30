const mongoose = require('mongoose')
const {Schema} =  mongoose


const PlaceSchema = new Schema ({
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    rating:Number,
     extraInfo:String,
     checkIn:Number,
      checkOut:Number,
      price:Number,
     maxGuests:Number,
     

})
 const PlaceModel = mongoose.model('Place',PlaceSchema);
 module.exports=PlaceModel;