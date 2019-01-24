const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Promise = require("bluebird");
const Sequelize = require('sequelize');
const db = require('./models/index.js');
const Game = db.Game
const Players = db.Players

app.use(express.static('frontend'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/game/', (req,res) => {
	let gameCode = req.body.gameId
	let userName = req.body.userName
	let game;
	let players;
	let gamePromise = Game.findOrCreate({
		where: {
			gameId: gameCode
		}
	})
	let playerPromise = Players.findOrCreate({
		where: {
			userName: userName
		}
	})
	return Promise.all([gamePromise,playerPromise]).spread((gameResult,playerResult) => {
		game = gameResult[0]
		players = playerResult[0]
		return game.addPlayer(players)
	}).then((results)=>{
		return res.json({
			game:game
		})
	})

}) 

app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/frontend/index.html`)
});


app.listen(port, () => console.log(`Glory to Rome listening on port ${port}!`));