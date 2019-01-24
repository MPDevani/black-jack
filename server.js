const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Promise = require("bluebird");
const Sequelize = require('sequelize');

app.use(express.static('frontend'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/game/', (req,res) => {
	let gameCode = req.body.gameId
	let userName = req.body.userName
	let gamePromise = Game.findOrCreate({
		where: {
			gameId: gameId
		}
	}) 
}) 

app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/frontend/index.html`)
});


app.listen(port, () => console.log(`Glory to Rome listening on port ${port}!`));