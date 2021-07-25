import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import HomeComponent from './info/home'
import DAQAP from './daqap'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink
} from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Navbar expand="sm" style={{ height: "30px", backgroundColor: '#337ab7' }}>
					<Navbar.Brand as={Link} to="/~daqap/index" style={{ color: 'white', fontSize: '12px' }}>DAQAP (Release Candidate 0.1)</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={NavLink} to="/~daqap/index" style={{ color: 'white' }}>Home</Nav.Link>
							<Nav.Link as={NavLink} to="/~daqap/daqap" style={{ color: 'white' }}>Daqap</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Switch>
					<Route exact path="/~daqap/index">
						<HomeComponent />
					</Route>
					<Route exact path="/~daqap/daqap">
						<DAQAP />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;

