import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from'react-router-dom'
import {IntroComponent} from './intro_component.jsx'
import {GamePendingComponent} from './game_pending_component.jsx'
import {GameStartComponent} from './game_start_component.jsx'

class BlackJackApp extends React.Component {
	render() {
		return <BrowserRouter>
			<div>
			<Switch>
				<Route path="/" exact component={IntroComponent} />
				<Route path="/game/:gameId/pending" component={GamePendingComponent} />
				<Route path="/game/:gameId/start" component={GameStartComponent} />
			</Switch>	
			</div>
		</BrowserRouter>
	}
}

ReactDOM.render(<BlackJackApp />, document.getElementById('black-jack-container'));