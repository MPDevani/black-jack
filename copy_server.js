const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Promise = require("bluebird");
const Sequelize = require('sequelize');
const db = require('./models/index.js');
const Game = db.Game
const Players = db.Players
const Deck = db.Decks;
const Hand = db.Hands;
const Card = db.Cards;

app.use(express.static('frontend'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function findGame(gameId) {
	return Game.findOne({
		where:{
			id: gameId
		} 
	});
}

function findPlayers(gamePromise) {
	gamePromise.then((game) => {
		return game.getPlayers()
	})
}

function createDeck(playersPromise, gameId) {
	playerPromise.then((players) => {
		return Deck.create({
			gameId: gameId,
			cardCount: 52 - (players.length * 2)
		})
	});
}

function createHand(gameId, playerId) {
	Hand.create({
		gameId: gameId,
		cardCount: 2,
		playerId: playerId
	});
}

function createTwoCards(handPromise, card1Type, card2Type) {
	return handPromise.then((hand) => {
		let card1Promise = Card.create({
			cardType: card1Type,
			handId: hand.id
		});

		let card2Promise = Card.create({
			cardType: card2Type,
			handId: hand.id
		});
		return Promise.all([card1Promise, card2Promise]);
	});
}

function createHandWithCards(gameId, playerId) {
	let handPromise = createHand(gameId, playerId);
	let cardsPromise = createTwoCards(handPromise, 5, 10);

	return Promise.props({
		hand: handPromise,
		cards: cardsPromise
	});
}

function initializePlayerForGame(player, gameId) {
	let handObjPromise = createHandWithCards(gameId, player.id);

	return Promise.props({
		player: player,
		handObj: handObjPromise
	})
}

function initializeAllPlayersForGame(playersPromise, gameId) {
	return playerPromise.then((players) => {
		let playerInitializationPromise =
			players.map((player) => initializePlayerForGame(player, gameId));

		return Promise.all(playersInitializationPromise);
	})
}

app.post('/api/game/:gameId/start', (req, res) => {
	let gamePromise = findGame(req.params.gameId);
	let playerPromise = findPlayers(gamePromise);
	let deckPromise = createDeck(playersPromise, req.params.gameId);
	let playerInfoPromise = initializeAllPlayersForGame(playerPromise, req.params.gameId);

	return Promise.props({
		playerInfo: playerInfoPromise,
		deck: deckPromise,
		game: gamePromise
	}).then((results) => {
		res.json(results)
	})		
})



app.listen(port, () => console.log(`Black Jack listening on port ${port}!`));