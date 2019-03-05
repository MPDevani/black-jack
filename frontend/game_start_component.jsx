import ReactDOM from 'react-dom'
import React from 'react'
import {withRouter} from 'react-router-dom'

//add a game started field in migration for game table, default to false [never allow person to start game twice]

export class GameStartComponent extends React.Component {
	constructor(props){
		super(props)
		this.gameId = this.props.match.params.gameId
		this.getGameInfo = this.getGameInfo.bind(this)
		this.players = false
		this.state = {
			playersInfo: undefined,
			deck: undefined,
			game: undefined
		}
	}	

	getGameInfo(){
	$.get('/api/game/' + this.gameId).then((results) => {
		this.players = true
		console.log(results.playersInfo);
		this.setState({
			playersInfo: results.playersInfo,
			deck: results.deck,
			game: results.game
			})
		})	
		
	}	

	
	render(){
		if(!this.state.game){
			this.getGameInfo()
			return (<div>Loading</div>)
		} else {
		let playerList = this.state.playersInfo.map((playerInfo) => {
				return (<div key={playerInfo.player.id}>
					<li> {playerInfo.player.userName}</li>
					<li> {playerInfo.hand.cardCount}</li>
					<li> {playerInfo.hand.cardType}</li></div>
				)})
		let GameStartForm = withRouter(({history}) => 
			(<div>
			<h1> Game: {this.state.game.gameId} has started</h1>
			<h2>Deck Number: {this.state.deck.cardCount}</h2>	
			<h2>Players:</h2>

			{playerList}

			</div>))
		return <GameStartForm />
		}	
	}
}