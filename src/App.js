import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import AppDeLP from './delp/delp'
import AppDung from './dung/dung'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			argumentsObjectDung: '',
			defeatsObjectDung: '',
			argumentsDung:'',
			attacksDung:''
		};
		this.handleResponse = this.handleResponse.bind(this);
	}
	
	handleResponse(response){
		this.setState({
			argumentsObjectDung: response.argumentsObjectDung,
			defeatsObjectDung: response.defeatsObjectDung,
			argumentsDung: response.argumentsDung,
			attacksDung: response.attacksDung
		});
	}

  render(){	
  return (
    <BrowserRouter>
        <Navbar expand="sm" style={{height:"30px", backgroundColor: '#337ab7'}}>
          <Navbar.Brand as={Link} to="/" style={{color:'white', fontSize:'12px'}}>DAQAP (Release Candidate 0.1)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/page1" style={{color:'white'}}>DeLP</Nav.Link>
              <Nav.Link as={NavLink} to="/page2" style={{color:'white'}}>Dung</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route 
	  	exact path='/page1' 
	  	render = {(props) => (
		  <AppDeLP handleGlobalResponseChange={this.handleResponse}/>
	  	)}/>
          <Route 
	  	exact path='/page2' 
	  	render = {(props) => (
		  <AppDung dungGraph={this.state}/>
	  	)}/>		
          <Redirect from="/" to="/page1"/>
        </Switch>
    </BrowserRouter>
  );
}
}

export default App;

