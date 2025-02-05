const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	dateDeparture: Date,
	price: Number,
	isBooked: Boolean
})

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart