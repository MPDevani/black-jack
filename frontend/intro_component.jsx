import ReactDOM from 'react-dom'
import React from 'react'
import {withRouter} from 'react-router-dom'
const playerName = 'playerIdentifier'
const gameCode = 'codeInputIdentifier'

export class IntroComponent extends React.Component {
	constructor(props){
	super(props)
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event, history){
		event.preventDefault();
		let userName = document.getElementById(playerName).value
		let gameId = document.getElementById(gameCode).value
		let payload = {
			userName: userName,
			gameId: gameId
		}

		$.post('/api/game/', payload).then((result) =>{
			history.push('/game/' + result.game.id + '/pending');
		})
	}

	render(){
		let GameForm = withRouter(({history}) => ( //explain this function
		<div>
			<form onSubmit = {(event) => this.handleSubmit(event, history)}>
			<label>
			Player Name
				<input type = 'text' name = 'playerName' id = {playerName} />
			Game Code	
				<input type = 'text' name = 'gameCode' id = {gameCode} />
			</label>
				<input type = 'submit' value = 'Submit' />
			</form>
		</div>))

		return <GameForm />;
	}
}