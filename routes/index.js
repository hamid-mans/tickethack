var express = require('express');
var router = express.Router();
var bdd = require('../models/connection')
var Cart = require('../models/cart')

// Récupérer le panier
router.get('/carts', async (req, res) => {
	const carts = await Cart.find({ isBooked: false })

	res.json({
		success: true,
		carts
	})
})

// Récupérer les réservations
router.get('/bookings', async (req, res) => {
	const bookings = await Cart.find({ isBooked: true })

	res.json({
		success: true,
		bookings
	})
})

// Ajouter au panier un voyage
router.post('/cart', async (req, res) => {

	const newCart = new Cart({
		departure: req.body.departure,
		arrival: req.body.arrival,
		dateDeparture: req.body.dateDeparture,
		price: req.body.price,
		isBooked: req.body.isBooked
	})

	const newDocCart = await newCart.save()

	res.json(newDocCart)
})

// Supprimer un voyage au panier
router.delete('/cart/:id', async (req, res) => {

	try {
		const cart = await Cart.deleteOne({ _id: req.params.id })

		res.json({
			success: true,
			message: "Voyage supprimé"
		})
	} catch (e) {
		res.status(500).json({
			success: false,
			error: "Erreur : " + e.message
		})
	}

})

// Transférer le panier vers les réservations
router.put('/carts', async (req, res) => {
	try {
		const exCart = Cart.findById(req.params.id)

		const cart = await Cart.updateMany({}, {
			isBooked: true
		})

		res.json({
			success: true,
			message: "Transfert vers les réservations effectuée"
		})
	} catch (e) {
		res.status(500).json({
			success: false,
			error: "Erreur : " + e.message
		})
	}
})

module.exports = router;