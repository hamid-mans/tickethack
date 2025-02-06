require('dotenv').config()
const mongoose = require('mongoose')

const bddString = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME

mongoose.connect(bddString, { timeoutMS: 2000 })
	.then(() => {
		console.log("La base de donnée est connectée !")
	})
	.catch(e => console.error("Erreur : " + e))