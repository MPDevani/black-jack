import ReactDOM from 'react-dom'
import React from 'react'
import {withRouter} from 'react-router-dom'

export class GamePendingComponent extends React.Component {
	constructor(props){
		super(props)
		this.gameId = this.props.match.params.gameId
		this.state = {players: undefined};
		this.playersFound = false;
		this.searchForPlayers = this.searchForPlayers.bind(this)
		this.startGame = this.startGame.bind(this)
	}

	searchForPlayers(){
		$.get('/api/game/' + this.gameId + '/players').then((results) => {
			console.log('hello')
			console.log(results.players)
			this.playersFound = true
			this.setState({players: results.players})
		})
	}

	startGame(event, history){
		event.preventDefault();
		$.post('/api/game/' + this.gameId + '/start').then((results) => {
			console.log(results);
			history.push('/game/' + results.game.id + '/start')
		})
	}

	render(){
		if(!this.playersFound){
			this.searchForPlayers();
			return <h1>'LOADING'</h1>
		} else {
			let playerList = this.state.players.map((player) => {
				return (
					<li key={player.id}> {player.userName}</li>
				)})
			let GamePendingForm = withRouter(({history}) => (<div>
					<h1>Game Has Not Started Yet</h1>
					<h3>Players:</h3>
					<ul>
						{playerList}
					</ul>
					<button onClick={(event) => this.startGame(event, history)}>Start Game</button>	
				</div>))	
				return <GamePendingForm />
		}
	}	
}
