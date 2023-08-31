const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  Place: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Place" },
  User: { type: mongoose.Schema.Types.ObjectId, require: true },
  checkIn: { type: Date, require: true },
  days: Number,
  checkOut: { type: Date, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  price: Number,
});
const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
