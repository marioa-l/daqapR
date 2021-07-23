import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
//import { BrowserRouter, Link, NavLink, Redirect, Route, Switch, Router } from 'react-router-dom'
import AppDeLP from './delp/delp'
import AppDung from './dung/dung'
import HomeComponent from './info/home'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink
} from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			argumentsObjectDung: '',
			defeatsObjectDung: '',
			argumentsDung: '',
			attacksDung: '',
			delpSemantic: ''
		};
		this.handleResponse = this.handleResponse.bind(this);
	}

	handleResponse(response) {
		this.setState({
			argumentsObjectDung: response.argumentsObjectDung,
			defeatsObjectDung: response.defeatsObjectDung,
			argumentsDung: response.argumentsDung,
			attacksDung: response.attacksDung,
			delpSemantic: response.delpSemantic
		});
	}

	render() {
		return (
			<Router>
				<Navbar expand="sm" style={{ height: "30px", backgroundColor: '#337ab7' }}>
					<Navbar.Brand as={Link} to="/home" style={{ color: 'white', fontSize: '12px' }}>DAQAP (Release Candidate 0.1)</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={NavLink} to="/home" style={{ color: 'white' }}>Home</Nav.Link>
							<Nav.Link as={NavLink} to="/delp" style={{ color: 'white' }}>DeLP</Nav.Link>
							<Nav.Link as={NavLink} to="/dung" style={{ color: 'white' }}>Dung</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Switch>
					<Route path="/home">
						<HomeComponent />
					</Route>
					<Route path="/delp">
						<AppDeLP handleGlobalResponseChange={this.handleResponse} />
					</Route>
					<Route path="/dung">
						<AppDung dungGraph={this.state}/>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;

