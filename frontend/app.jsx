import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from'react-router-dom'
import {IntroComponent} from './intro_component.jsx'

class BlackJackApp extends React.Component {
	render() {
		return <BrowserRouter>
			<div>
			<Switch>
				<Route path="/" exact component={IntroComponent} />
			</Switch>	
			</div>
		</BrowserRouter>
	}
}

ReactDOM.render(<BlackJackApp />, document.getElementById('black-jack-container'));