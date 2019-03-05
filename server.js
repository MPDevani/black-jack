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

app.post('/api/game/:gameId/start', (req, res) => {
	let gamePromise = findGame(req.params.gameId);
	let playersPromise = findPlayers(gamePromise);
	let deckPromise = createDeck(playersPromise, req.params.gameId);
	let playersInfoPromise = initializeAllPlayersForGame(playersPromise, req.params.gameId);

	return Promise.props({
		playerInfo: playersInfoPromise,
		deck: deckPromise,
		game: gamePromise
	}).then((results) => {
		res.json(results)
	})		
})

function findGame (gameId){
	return Game.findOne({
			where:{
			id: gameId
		} 
	})
};

function findPlayers (gamePromise){
	return gamePromise.then((game) => {
		return game.getPlayers()
	});
}	

function createDeck(playerPromise, gameId){
	return playerPromise.then((players) => {
		return Deck.create({
			gameId: gameId,
			cardCount: 52 - (players.length * 2)
		})
	})
}

function createHand(gameId, playerId) {
	return Hand.create({
		gameId: gameId,
		cardCount: 2,
		playerId: playerId
	})
};	

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
	
	function createHandWithCards(playerId, gameId){
			let handObjPromise = createHand(gameId, playerId);
			let cardsPromise = createTwoCards(handObjPromise, 5, 10)

			return Promise.props({
				hand: handObjPromise,
				cards: cardsPromise
			})
		}

function initializePlayerForGame(player, gameId) {
	let handObjPromise = createHandWithCards(player.id, gameId);

	return Promise.props({
		player: player,
		handObj: handObjPromise
	})
}

function initializeAllPlayersForGame(playersPromise, gameId) {
	return playersPromise.then((players) => {
		let playersInitializationPromise =
			players.map((player) => initializePlayerForGame(player, gameId));

		return Promise.all(playersInitializationPromise);
	})
}



app.get('/api/game/:gameId', (req, res) => {
	let gamePromise = Game.findOne({
		where:{
			id: req.params.gameId
		} 
	});

	let playersInfoPromise = gamePromise.then((game) => {
		return game.getPlayers()
	}).then((players) => {
		// [{player}, {player}] ==> [{player: {player}, hand: {hand}}, ...]
		let playersInfo = players.map((player) => {
			// {player} ==> {player: {player}, hand: {hand}}
			return Promise.props({
				player: player,
				hand: player.getHand()
			});
		})
		return Promise.all(playersInfo)
	});

	let deckPromise = gamePromise.then((game) => {
		return game.getDeck()
	});

	return Promise.props({
		game: gamePromise,
		deck: deckPromise,
		playersInfo: playersInfoPromise
	}).then((results)=> {
		return res.json(results)
	})
})

app.post('/api/game/', (req,res) => {
	let gamePromise = findOrCreateGame(req.body.gameId)
	let playerPromise = findOrCreatePlayer(req.body.userName)
	let playerAdditionPromise = addPlayers(gamePromise, playerPromise)

	return Promise.all([gamePromise, playerPromise, playerAdditionPromise]).spread((game, player) => {
		return res.json({
			game: game,
			player: player
		});
	});
});
	
function findOrCreateGame(gameId){
	return Game.findOrCreate({
		where: {
			gameId: gameId
		}
	}).spread((game, newGameCreated) => {
		return game;
	})
}

function findOrCreatePlayer(playerName){	 
	return Players.findOrCreate({
		where: {
			userName: playerName
		}
	}).spread((player, newPlayerCreated) => {
		return player;
	})
}

function addPlayers(gamePromise, playerPromise){
	return Promise.all([gamePromise,playerPromise]).spread((game, player) => {
		return game.addPlayer(player)
	});
}

app.get('/api/game/:gameId/players', (req,res) =>{
	return Game.findOne({
		where: {
			id: req.params.gameId
		}
	}).then((game) => {
		return game.getPlayers();
	}).then((players) => {
		return res.json({players: players})
		}) 
	}) 

app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/frontend/index.html`)
});


app.listen(port, () => console.log(`Black Jack listening on port ${port}!`));