import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import NavbarComponent from './NavbarComponent'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import UserSettings from './UserSettings'
import TabPage from './TabPage'
class App extends Component {
	constructor() {
		super()
		const cookies = new Cookies();
		var user = cookies.get('user') === undefined ? undefined : cookies.get('user')
		const loggedin = (user === undefined) ? false : true
		this.state = {
			signed_in: loggedin,
			current_tab: 'Popular',
			current_user: user,
			server_status: false,
		}
	}
	componentDidMount() {
		fetch('https://fast-card-api.herokuapp.com/status')
		.then(response => {
			if(response.status === 200){
				this.setState({
					server_status:true
				})
			}
		})
	}
	signIn() {
		const cookies = new Cookies();
		var user = cookies.get('user') === undefined ? undefined : cookies.get('user')
		this.setState({
			signed_in: true,
			current_user: user
		})
	}
	signOut() {
		this.setState({
			signed_in: false,
			current_user: undefined
		})
	}

	render() {
		if(this.state.server_status === false){
			return (
				<div>
                	<br/>
					<Container>
						<Jumbotron>
							<br/>
							<h5>
								Backend Server unavailable. Please wait 20-30 seconds for the server to come online.
							</h5>
						</Jumbotron>
					</Container>
            	</div>
			)
		} else {
			return (
				<BrowserRouter>
					<div className="app">
					<NavbarComponent
					current_tab={this.state.current_tab}
					current_user={this.state.current_user}
					signed_in={this.state.signed_in}
					signIn={this.signIn.bind(this)} 
					signOut={this.signOut.bind(this)}
					/>
					<Route path='/' exact render={(props) => (
						<TabPage {...props} 
						signed_in={this.state.signed_in}
						/>
					)}/>
					<Route path='/signupform' render={(props) => (
						<SignUpForm {...props} 
						signIn={this.signIn.bind(this)}
						signed_in={this.state.signed_in}
						/>
					)}/>
					<Route path='/login' render={(props) => (
						<LoginForm {...props} 
						signIn={this.signIn.bind(this)}
						signed_in={this.state.signed_in}
						/>
					)}/>
					<Route path='/settings' render={(props)=> (
						<UserSettings {...props}
						signOut={this.signOut.bind(this)}
						/>
					)}/>
					</div>
				</BrowserRouter>
				)
		
		}
	}
}

export default App;
